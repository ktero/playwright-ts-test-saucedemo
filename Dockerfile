# Set Node as the base image
FROM node:20

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.42.1-focal

# Set the work directory of the application
WORKDIR /app

# Copy the files to the app folder
COPY . .

# Install the dependencies in the Node environment
RUN npm install
