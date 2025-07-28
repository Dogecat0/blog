---
title: "Domain Layer Implementation: Building Aperilex's Core and Revision with Claude Code"
date: 2025-07-09
tags:
    - AI
    - Claude Code
    - Development
    - Python
    - Clean Architecture
    - Context7
    - LLM
categories:
    - AI Development
    - Aperilex
---

Into the third night of coding with Claude Code, I focused on implementing the domain layer of Aperilex as outlined on the project `PHASE.md`, refining the core logic and data structures that will drive our SEC Filing Analysis Engine. This post details the process and decisions made during this phase.

<!-- more -->

After the environment setups yesterday, I asked Claude to help me lay out the detailed plan for the domain layer implementation, which is the core of Aperilex. The current workflow is having a general `PHASE.md` file that outlines the high-level goals and tasks for each phase, and then Claude Code helps me break it down into detailed steps and code implementations.

## The Golden-Grand Plan on Surface

At the first the plan looks very complete and detailed, but as we started to implement, I realized that Claude made it too much like an encyclopedia entry, which tries to cover every aspect of company filings which makes it like building an encyclopedia (also, a duplicate of the `edgartools` library). So I had to revise it and 'remind' Claude to to focus on the core domain logic that Aperilex needs to be comprehensive analysis engine utilizing LLMs.

## The Revision Process

When I realized this which was already after the implmentation of `value objects`, I immediately asked Claude to revise the plan, focusing on the core domain logic and how Aperilex will interact with the `edgartools` library. The revised plan emphasized (for instance):
- **Core Domain Logic**: Focus on the essential classes and methods that will drive the analysis engine, such as `Company`, `Filing`, and `DataObject`.
- **Integration with `edgartools`**: Define how Aperilex will utilize the `edgartools` library for parsing and analyzing SEC filings, rather than duplicating its functionality.
- **LLM Utilization**: Emphasize how Aperilex will leverage LLMs to enhance the analysis and provide insights on the parsed data.

## Time

The whole process was iterative, which took about 2 hours for the initial implementation of `value objects` and then another 2.5 hours for the revision and implementation of the `entities`.

## Lessons Learned

### Code with Claude Code
The speed of development with Claude Code is impressive, but it requires careful review and guidance to ensure that the output aligns with the project's goals. The iterative process of refining the plan and implementation is crucial to avoid unnecessary complexity and ensure that the core functionality is robust and maintainable. Also, if your project is like Aperilex, which is a domain driven project, you need to be very clear about the domain logic and how it interacts with the external libraries. Generally, again, having a good and clear plan of multiple hierarchical levels and with phases for Claude to iterate on is the key to success (not sure about the 'success' part but that what I've learned so far how to code with Claude).

### Code Quality
So far with the specification of the `CLAUDE.md` and the `PHASE.md`, Claude Code has been able to produce high-quality code that adheres to the project's standards, at least to the extent of what my knowledge and what I want to learn. The clean and modular design of the architecture is still amazing and has been a great example for me so far.

We will continue to the building of the `Repository` and `domain services` in the next phase, which will interact with the classes implemented today and more to learn! :)
