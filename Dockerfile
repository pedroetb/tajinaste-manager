FROM node:alpine as build

COPY package.json package-lock.json /build/

WORKDIR /build

RUN npm i

COPY angular.json tsconfig.json ./

COPY src/ ./src/

ARG configuration=production

RUN npm run build -- -c ${configuration} --output-path dist


FROM nginx:alpine

LABEL maintainer="pedroetb@gmail.com"

COPY nginx /etc/nginx

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /build/dist /usr/share/nginx/html

CMD ["sh", "-c", " \
  file=/etc/nginx/conf.d/default.conf ; \
  vars='${API_ORIGIN} ${AUTH_ORIGIN}' ; \
  envsubst \"$vars\" < $file > $file && \
  nginx -g 'daemon off;' \
"]
