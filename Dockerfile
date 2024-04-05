FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 7070
CMD ["npm", "start"]