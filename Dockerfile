FROM node:16 as build-stage
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:16 as production-stage
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build-stage /app/build .
COPY --from=build-stage /app/package.json .
COPY --from=build-stage /app/package-lock.json .
RUN npm ci
EXPOSE 3000
CMD ["node", "."]