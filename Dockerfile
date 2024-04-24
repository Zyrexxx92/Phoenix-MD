FROM node:current

RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    webp && \
    apt install iputils-ping -y && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .

CMD ["node", "."]