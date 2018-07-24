FROM registry.matchvs.com/matchvs/matchvs_nodejs:1.0.2
WORKDIR /app
COPY package.json /app
RUN cnpm install
COPY . /app
CMD node main.js
