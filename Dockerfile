
# 使用官方Node.js作为基础镜像
FROM node:20.10-alpine3.18

# 设置工作目录
WORKDIR /usr/src/app

# 将项目源代码复制到工作目录
COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# 暴露端口，与NestJS应用的端口保持一致
EXPOSE 12005


# 运行应用docker build -t nest-img .
CMD [ "node", "dist/main" ]