### BASE
FROM node:carbon-alpine AS base
LABEL maintainer="ryan.dowling@atlauncher.com"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json package-lock.json ./


### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN npm install --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN npm install


### TEST
FROM dependencies AS test
# Copy app sources
COPY . .
# Run linters and tests
RUN npm run lint && npm run test


### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .
# Build source
RUN npm run build
# Expose application port
EXPOSE 3000
# Run
CMD npm start
