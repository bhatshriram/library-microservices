FROM node:12-alpine
WORKDIR /books
COPY . .
RUN npm install
CMD ["node", "books.js"]
EXPOSE 4545