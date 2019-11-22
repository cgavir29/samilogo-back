# Docker node version
FROM node:13.1.0

# Create app directory
WORKDIR /app

# Move dependencies to workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything to container
COPY . .

# Port where it runs
EXPOSE 5000

# Command to run server
CMD [ "npm", "start" ]
