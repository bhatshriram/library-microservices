FROM node:12-alpine
WORKDIR /customers
COPY . .
RUN npm install
CMD ["node", "customers.js"]
EXPOSE 4546