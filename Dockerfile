FROM node:18-alpine3.18
RUN apk add --update --no-cache openssl1.1-compat

WORKDIR /usr/src/app
ENV NODE_ENV=development
ADD package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn prisma generate
RUN yarn build

CMD ["node", "dist/src/main"]