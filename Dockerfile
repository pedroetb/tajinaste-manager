ARG NODE_IMAGE_TAG=current-alpine
ARG NGINX_IMAGE_TAG=mainline-alpine


FROM node:${NODE_IMAGE_TAG} as build

RUN apk add --no-cache git

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

CMD ["sh", "-c", " \
  file=/etc/nginx/conf.d/default.conf ; \
  vars='${API_ORIGIN} ${AUTH_ORIGIN}' ; \
  envsubst \"$vars\" < ${file} > ${file}.tmp && \
  mv ${file}.tmp ${file} && \
  nginx -g 'daemon off;' \
"]
