# cài môi trường node
FROM node:20

# tạo folder chứa source code
WORKDIR /home/app

# copy file package.json và yarn.lock vào Docker
COPY package*.json yarn.lock ./

# cài lib trong file package.json thông qua yarn
RUN yarn install

# copy prisma từ local sang Docker
# vừa copy từ local vừa tạo folder mới có tên là prisma trong Docker
COPY prisma ./prisma/

# tạo prisma client
RUN yarn prisma generate

# copy toàn bộ source code vào Docker
COPY . .

# expose port
EXPOSE 8080

# chạy source backend
CMD [ "yarn", "start" ]
