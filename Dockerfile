# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY smart-feed/package*.json ./

# Install project dependencies
RUN npm install

# Copy the backend files
COPY smart-feed/backend ./backend

# Copy the frontend files
COPY smart-feed/frontend ./frontend

# Build the frontend
RUN cd frontend && npm install && npm run build

# Expose the port the app runs on
EXPOSE 8080

# Define environment variables
ENV NODE_ENV production
ENV PORT 8080

# Run the application
CMD ["node", "backend/server.js"]