# Usa una imagen base con Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Construye la aplicación
RUN npm run build

# Usa el servidor estático para servir la aplicación
RUN npm install -g serve

# Exponer el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["serve", "-s", "build"]
