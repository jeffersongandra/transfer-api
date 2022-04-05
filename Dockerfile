# FROM node:16-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install --only=development
# COPY . .
# RUN npm run build

# # FROM node:16-alpine as production
# # ARG NODE_ENV=production
# # ENV NODE_ENV=${NODE_ENV}
# # WORKDIR /usr/src/app
# # COPY package*.json ./
# # RUN npm install --only=production
# # COPY . .
# # COPY --from=development /usr/src/app/dist ./dist
# CMD ["node", "dist/main"]


FROM node:16-alpine
WORKDIR /app
EXPOSE 3000
CMD ["npm", "start"]