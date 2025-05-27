FROM node:23-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the dev server port (Vite default is 5173)
EXPOSE 5173

# Run in development mode at runtime
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
