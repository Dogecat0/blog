---
title: 'Containerization: A Case Study in Environment and Configuration Management'
date: 2025-06-24 20:00:00
tags:
  - Docker
  - Docker Compose
  - Python
  - Configuration Management
  - Environment Variables
  - Troubleshooting
categories:
  - AI Projects
---

Today's objective was to containerize a Python-based SEC filing analysis application to ensure a consistent and reproducible runtime environment. This process involved not only creating the necessary Docker artifacts but also refactoring the application's configuration to adhere to best practices for handling secrets and environment-specific variables.

<!-- more -->

### Initial Containerization and Refactoring

The first phase of the work focused on establishing the foundational components for containerization and improving the project's production readiness.

The key commits included:

1.  **Addition of `Dockerfile` and `docker-compose.yml`:** Standard files were created to define the application's image and orchestrate the service stack, respectively. The `Dockerfile` is based on a Python image, installs dependencies from `requirements.txt`, and defines the container's entry point.
2.  **Dependency Management for Production:** The `psycopg2-binary` package was added to `requirements.txt`. This is a critical step to move from a development-time database like SQLite to a production-grade PostgreSQL database, which the Docker environment is configured to use.
3.  **Configuration Handling:** Environment variable management within the application's Python code (`main.py`, `database.py`) was refactored to rely on a centralized configuration system, anticipating the need to inject variables from the Docker environment.
4.  **Source Control Hygiene:** The `.gitignore` file was updated to exclude a broader range of files and artifacts, such as IDE configurations, environment files (`.env`), and cache directories, keeping the repository clean.

### The Core Challenge: Propagating Secrets to the Container

Upon the initial `docker-compose up`, the application failed with an error indicating a missing API key for the OpenAI/OpenRouter service.

**Investigation:**
The root cause was identified quickly: the API credentials were hardcoded in a `launch.json` file, which is used exclusively by the VS Code debugger. These variables are not present in the runtime environment when the application is executed directly or via Docker.

**Solution:**
The standard and most secure practice is to decouple secrets and configuration from the application code and development tools. The following steps were executed to resolve the issue:

1.  **Centralize Secrets in `.env`:** All environment-specific variables, including the existing `DATABASE_URL` and the new LLM credentials (`LLM_MODEL`, `OPENAI_API_KEY`, `OPENAI_BASE_URL`), were consolidated into a `.env` file at the project root. This file is explicitly excluded from version control by `.gitignore`.

2.  **Update `docker-compose.yml`:** While Docker Compose automatically loads variables from a `.env` file in the same directory, it is best practice to explicitly pass them to the service for clarity and control. The `web` service definition in `docker-compose.yml` was updated to pass the LLM-related environment variables to the container.

3.  **Update Application Configuration (`config.py`):** The application's Pydantic-based settings module (`config.py`) was extended. The `Settings` class was modified to load `LLM_MODEL`, `OPENAI_API_KEY`, and `OPENAI_BASE_URL` from the environment, making them available to the application logic in a structured and validated manner.

This three-step process—`.env` -> `docker-compose.yml` -> `config.py`—establishes a robust and conventional pattern for managing configuration that works seamlessly across local development and containerized environments.

### A Note on Local Environment Troubleshooting

A secondary challenge encountered during this process was related to the local Docker setup on Ubuntu. Initial commands failed with `permission denied... docker.sock`, which evolved into `protocol not available` after switching contexts.

This is a common issue for users of Docker Desktop on Linux. The CLI was initially trying to connect to the traditional Docker daemon socket (`/var/run/docker.sock`), which was not running. The correct target was the Docker Desktop VM, managed via the `desktop-linux` context.

The persistent `protocol not available` error indicated that the Docker Desktop backend service itself had entered a faulty state. The resolution was to perform a **Clean / Purge data** from the Docker Desktop troubleshooter. This action resets the Docker engine, deleting all images and containers, but resolves underlying data corruption.

### Conclusion

The primary goal of containerizing the application was achieved. The key takeaway is the critical importance of a well-defined configuration management strategy. Hardcoding secrets or relying on IDE-specific features for environment setup is brittle and will fail in a true deployment pipeline. By abstracting configuration into a `.env` file and systematically propagating it through the container orchestration layer into the application, we have a more portable, secure, and production-ready system.