FROM mcr.microsoft.com/playwright:v1.61.0-noble

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV CI=true
ENV WORKERS=2

CMD ["npm", "test"]