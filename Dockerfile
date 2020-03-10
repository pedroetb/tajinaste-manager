ARG NODE_IMAGE_TAG=12.16.1-alpine3.11
ARG NGINX_IMAGE_TAG=1.17.9-alpine


FROM node:${NODE_IMAGE_TAG} as build

ARG GIT_VERSION=2.24.1-r0
RUN apk add --no-cache \
	git=${GIT_VERSION}

COPY package.json package-lock.json /build/
WORKDIR /build
RUN npm i

COPY angular.json tsconfig.json ./
COPY src/ ./src/
ARG NG_BUILD_CONFIG_NAME=production
RUN npm run build -- -c ${NG_BUILD_CONFIG_NAME} --output-path dist


FROM nginx:${NGINX_IMAGE_TAG}

LABEL maintainer="pedroetb@gmail.com"

COPY nginx /etc/nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /build/dist /usr/share/nginx/html

ENV API_ORIGIN=https://hostname/api \
	AUTH_ORIGIN=https://hostname/auth

HEALTHCHECK --interval=1m --timeout=30s --start-period=1m --retries=10 \
	CMD wget --quiet --tries=1 --spider http://localhost || exit 1

CMD ["sh", "-c", " \
  file=/etc/nginx/conf.d/default.conf ; \
  vars='${API_ORIGIN} ${AUTH_ORIGIN}' ; \
  envsubst \"$vars\" < ${file} > ${file}.tmp && \
  mv ${file}.tmp ${file} && \
  nginx -g 'daemon off;' \
"]
