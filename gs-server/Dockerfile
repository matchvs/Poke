FROM node
WORKDIR /app
COPY package.json /app
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
COPY . /app
CMD node main.js
