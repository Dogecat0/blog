---
title: "Learning with Claude Code: Plan the Rewrite for SEC Analysis Project"
date: 2025-07-07
tags:
  - Claude Code
  - Clean Architecture
  - Python
  - Project Setup
  - Security
categories:
  - AI Development
  - Aperilex
---

I knew this would come at some point as I was developing the SEC Analysis Project. Last weekend I started to refactor the codebase for better code quality check and planned the roadmap for better architecture and security. Instead of applying band-aid fixes, I decided today on a complete rewrite—but this time, of course, not alone.

<!-- more -->

## The Solution to the Problem: Partnering with Claude Code

I have been following news about Claude Code for some time and the model Opus 4 seems like a game-changer for AI-assisted development especially for architecture. I decided to leverage its capabilities for my rewrite project also as an initial trial for its 90 pounds per month subscription to test if how well it will pay off.

## The Approach

I started the conversation with injecting the `repomix` of the existing codebase with the prompt:
```
Based on the sec-analysis-repomix-output, I want to completely rewrite this project with best design in architecture/system and engineering practices. Language will still be 
Python. Please provide me a README.md with comprehensive and strategic plan to achieve this.
```
Surprisingly and unsurprisingly, Claude gave me a well-defined structure for this project with all tools like HashiCorp, Kong, Snyk, Terraform, Kafka, GraphQL, Keycloak, etc. I was overwhelmed by the full structure until I saw the end of the plan: it's for a team with at least 10 people working around 30 weeks. I was like: nice and well-defined project but good it's not for me...

Then I twisted the prompt to let Claude know I am the solo developer. This led to a more tailored approach which you will see in the following sections.

### 1. Strategic Rewriting Plan

Following the initial conversation and a `README.md`, we developed a comprehensive 12-week rewrite plan with clear phases:

- **Foundation & Security** (Weeks 1-2)
- **Domain Modeling** (Weeks 3-4) 
- **LLM Integration** (Weeks 5-6)
- **Infrastructure Layer** (Weeks 7-8)
- **API Layer** (Weeks 9-10)
- **Testing & Quality** (Weeks 11-12)

### 2. Clean Architecture Principles

Claude introduced me to hexagonal architecture and Domain-Driven Design concepts I'd only heard about. Although the newly proposed layered architecture is not far from what I had:

```
Presentation → Application → Domain → Infrastructure
```

Each layer has clear responsibilities and dependencies point inward—a game-changer for maintainability.

### 3. Professional Python Project Setup

The most immediately valuable learning was project initialization. Claude taught me about with this todo plan for setting up the project:
```
  ⎿ Create project directory structure               
     Set up pyproject.toml with dependencies
     Create essential configuration files
     Set up development tools (pre-commit, ruff, etc.)
     Create basic documentation
     Initialize git repository
     Create GitHub repository
```

**Modern Tooling:**
- Poetry for dependency management
- Pre-commit hooks with comprehensive checks
- Ruff for lightning-fast linting
- Proper Docker development environment

**Configuration Management:**
- Pydantic settings for type-safe configuration
- Proper secrets handling with SecretStr
- Environment-specific configuration files

**Development Workflow:**
- Makefile for common commands
- Comprehensive .gitignore
- Security-focused pre-commit pipeline

Some of those configurations I implemented myself in the previous codebase, while others were guided by Claude's suggestions and new tools I discovered. In all, this initial setup to me is robust and comprehensive compared to my previous messy setup split into multiple places and implemented during multiple stages.

### 4. Security by Design

Of course one of the most important aspects is security. Instead of retrofitting security, Claude showed me how to build it in from day one:
- JWT authentication patterns
- Encryption service design
- Rate limiting and CORS configuration
- Proper API key management

## The Transformation

**Before:** A vulnerable monolith with exposed secrets and no tests written (yet, although it was on the plan but this time they will be written along the development)
**After:** A professionally structured project ready for clean architecture implementation

What impressed me most was how Claude balanced **practical implementation** with **educational value**. Every suggestion came with explanations written in plain language of why certain patterns work and how they fit into the bigger picture. Also in the Claude Code console there was always a todo plan showing the steps while it was executing which was very helpful.

## Key Takeaways

1. **AI as Architecture Partner for Planning**: Claude (Opus 4) was teaching architecture principles and this has helped me to think more deeply about the design of my applications from the beginning and indeed has been a good opportunity for learning.

2. **Modern Python Ecosystem**: There's so much tooling available to make Python development professional and robust—I just needed guidance on how to use it properly.

3. **Security First**: Building security into the foundation is infinitely easier than bolting it on later.

## What's Next

With the strategy complete and project initialized, I'm ready to start Phase 1 implementation in Claude Code. The foundation is solid, the roadmap is clear, and I've learned quite a bit about professional Python development. This has been a great start to achieve the goal of rewriting this project.

---

**Follow the Journey:**
- 📁 [GitHub Repository](https://github.com/Dogecat0/aperilex) - Complete project with all setup
- 📖 [Full Strategy Document](https://github.com/Dogecat0/aperilex/blob/main/README.md) - 12-week implementation plan
- 🔧 [Setup Guide](https://github.com/Dogecat0/aperilex/blob/main/docs/SETUP.md) - Professional development environment

**Credit to Gemini**
Although this has been a fantastic night with Claude Code. But thanks to Gemini for the inspiration of the new project name `AperiLex` which connects the idea of "uncovering, revealing" (Aperio) with the domain of linguistic complexity found in SEC filings (Lex).

*Star the repository to follow along as this strategy comes to life over the next 12 weeks!*