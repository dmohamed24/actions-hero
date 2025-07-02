## 1. Quick Simple Explanation of the App

(Speak with enthusiasm and clarity)

👋
“Hey everyone! In this video, I’m going to walk you through a full-stack DevOps project I’ve built using Node.js, Docker, GitHub Actions, and AWS EC2.

Let’s start with a super simple overview of the app itself.

This is a lightweight Node.js application built using Express. And what it does is straightforward — every time you refresh the page, it returns a new random number.
That’s it. Simple, fast, and stateless.

It’s perfect for learning and demoing how to set up a complete DevOps pipeline from development to production.”

## 2. Explain the Infrastructure and How All the Parts Are Connected

(Use visuals or diagrams if possible during this section)

### 🔹 From the User’s Perspective:

“So let’s think about it from the user’s point of view.

They open their browser and type in the public IP address of the server — the EC2 instance.

That request hits port 3000 on the server, which is allowed by the EC2’s security group.

Behind the scenes, that server is running a Docker container that hosts the Node.js application. Docker maps port 3000 on the container to port 3000 on the EC2 instance.

The app receives the request, generates a random number, and sends back a webpage displaying it.

All of this happens in milliseconds.”

### 🔹 From the Developer’s Perspective:

“Now, as a developer, here’s what the full pipeline looks like:

I write code locally — a Node app and some Docker files.

I can test the app using Docker Compose, which spins it up with nodemon for live reloads.

When I push my code to GitHub:

A CI workflow runs automatically. It checks my code style, runs tests, and builds a Docker image tagged with that commit.

That image gets pushed to Docker Hub.

Then, either on push to the main branch or manually through the GitHub UI, a CD workflow kicks in:

It SSHes into the EC2 instance.

It pulls the latest Docker image.

It stops and removes the previous container if it exists.

Then it runs the new container, exposing port 3000 for users to access.

So from writing code to serving it in production — everything is automated. This gives us a clean, repeatable deployment process.”

## 3: Explain code base

###

### 🐳 Dockerfile (Multi-Stage Build)

This project uses a multi-stage Docker build, which means we define separate build environments in a single file — one for development and one for production

1. The base stage sets up the Node environment and installs dependencies.

   - We start from the node:20.13-alpine image: Alpine is a minimal version of Linux — it’s super lightweight and optimized for security and performance. Using Alpine results in samller Docker images being created ehich results in quicker build time which is importatn when pushing and pulling to docerk hub
   - We set the working directory with WORKDIR /usr/src/app : This is a convention — putting your app under /usr/src/app makes it easier to understand and manage where your app code lives inside the container.

2. The development stage adds dev tools and runs the app with npm run dev.

   - Here we install all dependencies (npm install), including dev dependencies.
   - We copy all files, so that we can run the app using something like nodemon in development.
   - This stage is only used when running locally, such as through Docker Compose.

3. The production stage strips out dev dependencies, copies only the necessary code, and runs the app with node index.js.
   - Instead of npm install, we use npm ci — : This is a clean install that uses the exact versions from package-lock.json. It’s faster, more ideal for production because it avoids modifying lockfiles or resolving dependencies again.

This helps keep the final production image lean and secure.”

### 🐳 docker-compose.yml

“This file is all about making local development easier and cleaner.

When I’m working on the app, I don’t want to install Node, dependencies, or worry about versions on my local machine. Instead, I use Docker Compose to run everything inside a container.

Here’s what the Compose file does:

It uses the Dockerfile in development mode.

It mounts the source code into the container so changes are reflected immediately.

It runs nodemon, which means the server automatically restarts whenever I make changes to the code.
This works because of the volumes section in the Compose file — it mounts the source code from my local machine into the container. So any time I save a file, the changes are instantly reflected inside the container, and nodemon picks that up and restarts the app.
This setup gives me live-reload behavior inside Docker,

It maps port 3000 inside the container to port 3000 on my machine, so I can view the app in the browser just like normal.

💡 Why use Docker locally instead of running from the terminal?

It keeps your machine clean — you don’t need to install Node or any packages globally.

Your dev environment is exactly the same as production, so there are no surprises when deploying.

You can share the same Docker config across your team and avoid the classic “it works on my machine” issues.

So, it gives you speed, consistency, and isolation — all without sacrificing convenience.”

### 3. ⚙️ ci.yml – Continuous Integration

- This is the GitHub Actions workflow that runs every time I push code or open a pull request.

- It does 4 key things:

  1. Checks out the code.

  2. Runs tests and linting to make sure the code is valid and clean.

  3. Builds a Docker image, tagged with the commit SHA.

  4. Pushes that image to Docker Hub for later use in deployment.

This ensures that every commit is validated and there’s always an image ready to deploy.

### 4. 🚀 cd.yml – Continuous Deployment

- Now for the magic that gets the app into production.

- The CD workflow runs on two triggers:
  . Automatically on push to main.
  . Or manually via the GitHub Actions UI.

- Here’s what it does:
  1. SSHes into the EC2 instance using a private key stored in GitHub Secrets.
  2. Installs and starts Docker if needed.
  3. Stops and removes any existing container.
  4. Pulls the latest image from Docker Hub.
  5. Runs the app as a container, mapping port 3000.

- So all I need to do is push to main, and GitHub Actions takes care of deploying the latest version of the app.

## others

- Most cloud VMs (like EC2) require elevated privileges to manage system packages and services. Docker itself usually requires root access on the host machine (unless the docker group is configured for non-root users).

- Inside the Docker Container (Your App):

  - Here, you want to avoid running as root for security reasons.
  - Running as a non-root user (like node) protects against: Container escape attacks , Accidental file permission issues , Running malicious code with elevated privileges (if your app or dependencies are compromised)

- You might use sudo on your laptop to install Docker. But inside the VM, you'd avoid logging in as root for day-to-day use

```
app.listen(3000, '0.0.0.0')
✔️ Accepts requests from:

Inside the container

Inside the EC2 instance

Your laptop via EC2’s public IP

A phone on the internet via EC2’s IP

Any client, anywhere — as long as network/firewall rules allow it

So yes, "binds to all interfaces" means “listens on all IP addresses available to the app” — not all request types (like HTTP/HTTPS), but all network paths the OS provides.




docker run -p 8080:3000 my-image
You're saying:

"Expose port 8080 on the host (e.g., your EC2 instance), and forward any traffic received there to port 3000 inside the container."
```
