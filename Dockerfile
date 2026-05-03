# Stage 1: Build the React + Vite app
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo 'server { \
  listen 8080; \
  \
  # Security Headers \
  add_header X-Frame-Options "SAMEORIGIN" always; \
  add_header X-Content-Type-Options "nosniff" always; \
  add_header X-XSS-Protection "1; mode=block" always; \
  add_header Referrer-Policy "strict-origin-when-cross-origin" always; \
  add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always; \
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always; \
  \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
