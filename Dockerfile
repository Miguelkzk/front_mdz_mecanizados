# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Construye la aplicación usando Vite
RUN npm run build

# Instala el servidor estático `serve`
RUN npm install -g serve

# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["serve", "-s", "dist"]
