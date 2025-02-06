# ใช้ Node.js official image
FROM arm32v7/node:16

# ตั้ง working directory ภายใน container
WORKDIR /usr/src/app

# Copy package.json และ package-lock.json (ถ้ามี) ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# Copy โค้ดทั้งหมดจากโปรเจกต์ไปยัง container
COPY . .

# สร้างโปรเจกต์ NestJS (compile)
RUN npm run build

# เปิด port ที่ NestJS ใช้งาน (โดยปกติจะเป็น port 3000)
EXPOSE 3006

# รันคำสั่ง start เมื่อ container เริ่มทำงาน
CMD ["npm", "run", "start:prod"]
