## Random Number Node App

This project is a simple Node.js application that serves a webpage displaying a random number every time the page is refreshed.

### Project Overview

#### 1. Node Application

- A lightweight Express-based Node.js server.
- Returns a random number in the response on every page load.

#### 2. Local Development with Docker Compose

- Uses `docker-compose.yml` to run the app locally inside a container.
- Enables live code reloading with nodemon for rapid development.
- Simplifies local setup by packaging dependencies and environment.

#### 3. Dockerfile with Multi-Stage Builds

- _Development Stage_: Installs all dependencies including dev dependencies, sets up nodemon, and runs the app for local development.
- _Production Stage_: Installs only production dependencies, copies the necessary source files, and runs the app efficiently in production mode.
- This multi-stage approach produces optimized images tailored to different environments.

#### 4. GitHub Actions Workflows

##### CI Workflow (ci.yml)

- Runs on every pull request.
- Peforms
  - Tests: Automated testing of the application.
  - Linting: Checks code style and quality.
  - Formatting: Ensures consistent code formatting.
  - Preview: Builds and pushes a Docker image tagged with the commit SHA for testing.

##### CD Workflow (cd.yml)

- Triggers on pushes to the main branch or can be manually triggered via the GitHub UI.
- Runs the same tests, linting, and formatting as CI.
- Deploys the latest Docker image to the EC2 instance for production use.

##### Secrets Used:

- `DOCKERHUB_USERNAME` & `DOCKERHUB_PASSWORD`: For Docker Hub login to push and pull images.
- `EC2_HOST, EC2_USER, and EC2_KEY`: Credentials and host information for SSH access to the EC2 instance.

#### 5. Infrastructure on AWS EC2

- Created an EC2 instance in the default VPC.
- Configured Security Group to allow:
  - HTTP (port 80), HTTPS (port 443)
  - SSH (port 22) for remote management
  - Application port 3000 to expose the Node.js app
- Docker is installed on the EC2 instance.
- The instance pulls and runs the latest Docker image on deployment.

### GETTING STARTED

#### Running locally

This will start the Node.js app with live reload enabled.

```
docker-compose up
```

#### Building the docker image manually

```
docker build --target production -t yourusername/random-number-app .
docker run -p 3000:3000 yourusername/random-number-app
```

#### Deployment

Deployment is handled via GitHub Actions, which builds, tests, and pushes Docker images, then SSHes into the EC2 instance to pull and run the new contain

### Notes

The app listens on 0.0.0.0 and port 3000 to work inside Docker and be accessible externally.

The EC2 instance runs the container mapping host port 3000 to container port 3000.

Manual workflow dispatch is enabled for flexible deployment triggers.
