ARG NGINX_IMAGE_TAG=1.17.9-alpine
FROM nginx:${NGINX_IMAGE_TAG}

LABEL maintainer="pedroetb@gmail.com"

COPY nginx /etc/nginx
RUN rm -rf /usr/share/nginx/html/*
ARG NG_BUILD_OUTPUT_PATH=dist
COPY ${NG_BUILD_OUTPUT_PATH} /usr/share/nginx/html

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
