# actions-hero

## 1. Events

Events in GitHub Actions are triggers that initiate workflows. Some common events include:

Pull Request: Triggered when a pull request is opened, updated, or closed.

Push to a Branch: Triggered when changes are pushed to a specific branch.

Issues: Triggered when an issue is created, opened, or closed.

## 2. Workflows

A workflow is a configurable automated process that runs one or more jobs in response to an event. Each workflow must contain at least one job.

### Structure of a Workflow

A typical workflow consists of:

Example Workflow Structure:

name: Example Workflow
on: push  # Event that triggers the workflow

```
name: Example Workflow
on: push  # Event that triggers the workflow

jobs:
  job1:
    runs-on: ubuntu-latest  # Runner environment
    steps:
      - name: Step 1
        uses: actions/checkout@v4  # Action to checkout repo
      - name: Step 2
        run: echo "Hello, world!"  # Shell command
      - name: Step 3
        uses: some/action@v1  # Another action

  job2:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        uses: actions/setup-node@v3  # Setting up Node.js
      - name: Step 2
        run: npm install  # Installing dependencies
      - name: Step 3
        run: npm test  # Running tests
```

### Breakdown of Workflow Components

Jobs: A job is a set of steps that execute on the same runner.

Example: job1 and job2

Steps: A series of tasks within a job, executed sequentially.

Each step can be an action (predefined functionality) or a shell command.

## 3. Runners

Runners are machines that execute the steps defined in a workflow. When a workflow is triggered, the jobs are assigned to runners, which sequentially execute each step within the job.

### Key Points about Runners

Steps within a job run sequentially from top to bottom.

Jobs, however, can run in parallel or be configured to run sequentially.

Execution results are logged for each step.

### Types of Runners

GitHub Actions offers two types of runners:

GitHub-Hosted Runners (Managed by GitHub):

Available environments: ubuntu-latest, windows-latest, macos-latest

Automatically scaled and maintained by GitHub

Self-Hosted Runners (Managed by the user):

Can run on personal machines or cloud instances

Offers more control and customization

Ideal for running workflows in private environments or specific hardware configurations


## Github actions YAML file Example 

```
name: Basic GitHub Actions Example

on: [push, pull_request]

jobs:
  example-job:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run a shell command
        run: echo "Running GitHub Actions Basics!"

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

## Summary

Events trigger workflows (e.g., pull requests, pushes, issues).

Workflows consist of jobs and steps, where steps execute sequentially.

Runners execute the steps within jobs, either on GitHub-hosted or self-hosted environments.

By understanding these core components, you can start building and automating workflows efficiently using GitHub Actions!