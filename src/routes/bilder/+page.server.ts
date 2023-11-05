import type { Actions, PageServerLoad } from './$types';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { fail } from '@sveltejs/kit';
import { addUploads, getUploads, purgeUploads } from '$lib/server/database';
import type { Upload } from '$lib/types';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg';
import { purge, put } from '$lib/server/blobstorage';

export const load: PageServerLoad = async () => {
	return { images: getUploads() };
};

export const actions = {
	upload: async ({ request }) => {
		try {
			const formData = await request.formData();
			const blobs = formData.getAll('uploads') as Blob[];
			const uploads: Upload[] = [];
			const uploadDirectory = path.join(process.cwd(), 'static', 'uploads');
			fs.mkdir(uploadDirectory, { recursive: true });
			for (const blob of blobs) {
				if (!blob.type.startsWith('image/') && !blob.type.startsWith('video/')) {
					return fail(400, { err: 'file type not supported' });
				}

				if (blob.type.startsWith('image/')) {
					if (blob.size > 20 * 1024 * 1024) {
						// 20MB
						return fail(400, { err: 'image too large (>20MB)' });
					}

					const buffer = Buffer.from(await blob.arrayBuffer());
					const s = sharp(buffer);
					const metadata = await s.metadata();
					/*if (metadata.width || 0 < 640 || metadata.height || 0 < 480) {
						return fail(400, { err: 'image too small (<640x480)' });
					}*/

					const fileExtension = blob.name.split('.').pop();
					const fileUUID = crypto.randomUUID();

					const originalFileName = `${fileUUID}.${fileExtension}`;
					await put(originalFileName, buffer);

					const compressedFileName = `${fileUUID}-compressed.webp`;
					const compressed = await s
						.resize(Math.min(metadata.width ?? 1440, 1440))
						.toFormat('webp')
						.toBuffer({ resolveWithObject: true });
					const compressedUrl = await put(compressedFileName, compressed.data);

					const thumbnailFileName = `${fileUUID}-thumbnail.webp`;
					const thumbnail = await s
						.resize(Math.min(metadata.width ?? 250, 250))
						.toFormat('webp')
						.toBuffer({ resolveWithObject: true });
					const thumbnailUrl = await put(thumbnailFileName, thumbnail.data);

					uploads.push({
						createdAt: new Date().toISOString(),
						url: compressedUrl,
						type: 'image/webp',
						width: compressed.info.width,
						height: compressed.info.height,
						thumbnailUrl
					});
				} else if (blob.type.startsWith('video/')) {
					/*if (blob.size > 1024 * 1024 * 1024) {
						// 1GB
						return fail(400, { err: 'image too large (>1GB)' });
					}*/

					const buffer = Buffer.from(await blob.arrayBuffer());
					const fileExtension = blob.name.split('.').pop();
					const fileUUID = crypto.randomUUID();

					const originalFileName = `${fileUUID}.${fileExtension}`;
					await put(originalFileName, buffer);
					const originalFilePath = path.join(uploadDirectory, originalFileName);
					await fs.writeFile(originalFilePath, buffer);

					const video = await new ffmpeg(originalFilePath);
					console.log(JSON.stringify(video.metadata));

					const compressedFileName = `${fileUUID}-compressed.mp4`;
					await video
						.setVideoSize('1440x?', true, true)
						.setVideoCodec('mpeg4')
						.setAudioCodec('libfaac')
						.setAudioBitRate(128)
						.setVideoBitRate(1024)
						.save(path.join(uploadDirectory, compressedFileName));

					const thumbnailFileName = `${fileUUID}-thumbnail.jpg`;
					await video.fnExtractFrameToJPG(uploadDirectory, {
						number: 1,
						size: '250x?',
						file_name: thumbnailFileName
					});

					uploads.push({
						createdAt: new Date().toISOString(),
						url: '/uploads/' + compressedFileName,
						type: blob.type,
						width: 0,
						height: 0,
						thumbnailUrl: '/uploads/' + thumbnailFileName
					});
				}
			}
			await addUploads(uploads);
		} catch (err) {
			console.error(err);
			return fail(500);
		}
	},
	purge: async () => {
		await purge();
		await purgeUploads();
	}
} satisfies Actions;
