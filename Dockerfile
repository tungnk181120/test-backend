# build stage
FROM bitnami/node as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock /app
COPY .env.example /app/.env
RUN yarn
COPY . .

RUN yarn start:dev 

# production stage
# FROM public.ecr.aws/nginx/nginx as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]