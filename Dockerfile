# Use the official Node.js image as a base image
# Используем официальный образ Node.js в качестве базового образа
FROM node:20-alpine AS builder

# Set the working directory
# Установка рабочей директории
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# Копирование package.json и package-lock.json в рабочую директорию
COPY ./package.json ./package-lock.json ./

# Install dependencies
# Установка зависимостей
RUN npm install

# Copy other application files
# Копирование остальных файлов приложения
COPY . .

# Build the application
# Сборка приложения
RUN npm run build

# Use a lightweight nginx image to serve the application
# Используем облегченный образ nginx для запуска приложения
FROM nginx:alpine

# Copy the built application from the previous stage to the nginx image
# Копирование собранного приложения из предыдущего этапа в образ nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Specify the port that nginx will use
# Указываем порт, который будет использоваться nginx
EXPOSE 80

# Run nginx in the background
# Запускаем nginx в фоновом режиме
CMD ["nginx", "-g", "daemon off;"]