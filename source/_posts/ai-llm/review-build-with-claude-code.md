---
title: 'Building with Claude Code: 7 Weeks of Review and Reflection'
date: 2025-08-31 13:00:00
tags:
- AI Development
- llm
- claude code
categories:
- AI Development
- Aperilex
---

It's been 7 weeks since I started building extensively with Claude Code. Now I have managed to deploy a working version of [Aperilex](https://www.aperilexlabs.com) which was a complete rewrite of the previous [version](https://github.com/Dogecat0/sec-filing-analysis) which took about 5 months without deployment. Of course, there have been many ups and downs, but overall it's been a fantastic learning journey. Time to review and reflect on the entire process.

<!-- more -->

### Basic Information

First, let's have a look at some interesting stats from the project:
- **Total Time Spent**: ~7 weeks part-time (nights and weekends)
- **Input Tokens (Last 30 Days)**: ~1.1 million
- **Output Tokens (Last 30 Days)**: ~4.7 million
- **Total Cost (Last 30 Days)**: ~$1600 (token-based pricing, but actual cost was 1 months of Claude Max x5 subscription plan worth $90)

Next, boring but still important tech stacks:
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Python with Poetry, FastAPI
- **Database**: PostgreSQL, SQLAlchemy, Alembic
- **LLM Provider**: OpenAI, Gemini
- **Infrastructure**: AWS(Aurora RDS, S3, Elastic Beanstalk, Cloudfront), Docker, Pulumi
- <s>**Messaging**</s>: RabbitMQ(local), AWS SQS (production). (Due to demonstration purposes, the message queue and task system are not enabled in production yet)

Now, architecture:
- **Frontend**: Interactive dashboard and charts.
- **Presentation Layer**: FastAPI for RESTful API endpoints.
- **Application Layer**: CQRS command and query handlers, service orchestrators.
- **Domain Layer**: Business entities, value objects.
- **Infrastructure Layer**: Database access, external API integrations, LLM interactions.

### First Time Experiences
This was not only just my first time building with Claude Code, I have also picked up quite a few new concepts along the way. Here is a non-exhaust list of the first-time experiences:
- Setting up **PostgreSQL** with **Alembic** migrations.
- **CQRS(Command Query Responsibility Segregation)** pattern with command and query handlers.
- **Domain-Driven Design** principles for structuring the application.
- Deploy with **AWS** and **Pulumi** using services like **Elastic Beanstalk**, **Aurora RDS**, **Cloudfront**, **S3** etc.
- Of course, building a full-stack application with **Claude Code** in general.

### Building with Claude Code
Overall, my experience with Claude Code has been very positive as someone who is new in software development. Let's break it down.

#### **The Start**
I was using IDE AI tools like GitHub Copilot, Roo Code for a while when I was developing the previous version and found them quite helpful. Then I heard about CLI AI tools like Claude Code and Gemini CLI which are quite new and different from the IDE plugins. I was curious and excited about this new way of coding with AI in CLI. So I decided to give it a try.

I was not that familiar with CLI tools, so one of the initial idea was to move myself from UI-based coding editor to CLI-based coding environment to learn more CLI commands. But this just completely opened a new world for me. I think the biggest advantage of CLI AI tools like CC is that it has more context-awareness than IDE plugins. It can see the whole project structure and files, although IDE AI plugins can also have the bigger context of the project but that requires more manual effort. The control and converage of CC have of a project also makes the developer have to interact with it more to build a sort of mutual understanding about the project itself. Seeing how the CC uses CLI tools like `grep`, `find`, `rg` etc to search and read files is quite fascinating and powerful way to learn as well.

#### **The Setups**

Anthropic has offical [document](https://www.anthropic.com/engineering/claude-code-best-practices) to help you get started with Claude Code. Here are some important steps I found very useful in my experience:

**1. `CLAUDE.md`**:
First and probably most important step is to set up the `CLAUDE.md` file. This file is the main configuration file for Claude Code to understand the project. I have mentioned it before in this [post](https://zhicheng-wang.com/2025/07/08/ai-llm/initial-setups-and-plan.html). Here what I want to add is, the setup of this file is not a one-time thing and it depends on the needs of the project. It's also a fantastic way to learn how other more experienced engineers think  and strcture the project from setting up standards, build steps, code qualities and more in their `CLAUDE.md` files like [this one](https://www.dzombak.com/blog/2025/08/getting-good-results-from-claude-code/). 

**2. `MCP`**:
Another important step is to set up the `MCP(Model Context Protocol)` for the project. MCP is a way to   standardizes how large language models (LLMs) connect and interact with external tools, systems, and data sources in real-time. I have also mentioned it before in this [post](https://zhicheng-wang.com/2025/07/08/ai-llm/initial-setups-and-plan.html). There are many fantastic MCPs but personally most important two to me so far are: `Context7` and `PlayWright`. If you want some latest dependencies or libraries that the model might not be aware of back in their training time, `Context7` is a great way to teach the model about them. If you want LLMs to interact with web pages through structured accessibility snapshots, bypassing the need for screenshots or visually-tuned models., `PlayWright` is a great one.

**3. `Commands`**:
Next is creating useful commands for Claude Code to use. Commands are basically the Markdown files saved in `./claude/commands` that you want to repeatedly use depending on the need for the task you want Claude Code to perform. For example, if you want to do some quick implementation, you might want to set up commands like `/explore-implement` with the content like:
```markdown
1. Explore the project structure and files to understand the context.
2. Identify the relevant files and modules for the task.
3. Implement the feature or fix the bug as per the requirements.
```
If you want to do some deep thinking and planning for more complex task, you might want to set up commands like `/explore-plan-code-test` with the content like:
```markdown
At the end of this message, I will ask you to do something. Please follow the "Explore, Plan, Code, Test" workflow when you are in each phase and use relevant subagents to perform the tasks
1. Explore the project structure and files to understand the context.
2. Plan the implementation in detail, including tests and documentation.
3. Code the feature or fix the bug as per the plan.
4. Test the implementation thoroughly to ensure it works as expected.
```

Also, **ultrathink** has been a very useful line you can put in your commands to make Claude Code think harder about the task. Useful but become a meme as well...

**4. `Subagents`**:
During the process of building with Claude Code, Anthropic has also introduced the new feture of self-defined `Subagents` which are basically smaller agents that can perform specific tasks within the main agent's workflow. This is particularly useful for complex tasks that require multiple steps or specialized knowledge. And one of the biggest advantage of using subagents is they do not consume the main thread's context window, which is critical for the main agent to keep the overall information of the task. 

The most exciting part about subagents for me is that when you define or pick your own subagents, it is a process that requires you to think about what task you want a subagent to perform and what subagent you want. This has been a great way of learning how to structure a team of agents working together based on their specialties, like assembling a real team in reality. Here are some great resources that you find almost all the agents you might need. [https://subagents.cc/](https://subagents.cc/) and [https://github.com/wshobson/agents](https://github.com/wshobson/agents)

But later on, I found that there are two main downsides about subagents:
1. Too many subagents can consume too many tokens used in main thread. I recently found out my subagents which were copied from one of the sources I mentioned above were 24.4k tokens (12.2% of full context window). It's nice to have a complete 'team' but also it is practical to not have too many subagents that are not used often.
2. Subagents cannot communicate with each other. If there are multiple subagents working on the same task, they cannot share information with each other and they might do duplicated work or delete each other's work. This is a big limitation for complex tasks that require collaboration among subagents.

#### **Workflow**

There are mainly two workflows I have seen and been using with Claude Code: **Maximize the freedom of Claude Code (but not [YOLO](https://www.anthropic.com/engineering/claude-code-best-practices) mode with `claude --dangerously-skip-permissions`)** and **Build with a plan and iterate with small steps**. I think it depends on which level of the control you want and which level you are at as an engineer, those two workflows are not mutually exclusive and have different outcomes that you might need or not need.

**1. First one is to maximize the freedom of Claude Code.** This is more like a 'let it be' approach where you let Claude Code explore the project and come up with its own plan and implementation. This was a fantastic moment for me at the beginning when I was planning the rewrite of this project as a new engineer to see what possibilities are out there. Like many first-time expriences lised earlier, the `CQRS` pattern, `Domain-Driven Design` principles, those were not known to me but Claude Code introduced them to me. I think this is a great way to learn system and architecture design concepts and patterns in the intial brainstroming phase. As someone who has not been coding for that long, I found coding with Claude Code in this way has been accelerating my learning process towards those concepts normally only senior engineers would know and to decide, but Claude Code has exposed them to me in much earlier stage. This steep learning curve has speed up my growth as an engineer.

**2. Second one is to build with a plan and iterate with small steps.** This is more like a 'let's do it step by step' approach where you have a clear plan and break down into small tasks for Claude Code to implement. You normally strictly follow the command like `/explore-plan-code-test` I mentioned earlier. This gives you more granualar control of the project and you can make sure each step is implemented, tested and documented properly. After the initial brainstorm phases, I found this is a more practical way to build a project with Claude Code and normally comes with much better quality and accuracy of the implementation.

**3. Auxiliary Workflows** 
**TDD**: ogether with the two workflows above, using TDD(Test-Drive Design) and writing documentation with Claude Code have never been more important. LLMs make mistakes that's why we have the second workflow to implement and iterate with small steps and test them carefully. But manually writing tests is necessary but often boring and time-consuming. Fortunately, LLMs have made writing tests much easier and more time-saving. With the short amount of the time, Claude Code can write quite comprehensive tests for a feature you want to implement and I think this is one of the biggest reasons we should bring TDD to the centre of the workflow.

**Documentation**: Here the documentation is not only just for the users or other developers of the project, but also for Claude Code itself. For example, if you have an unfinished task that you want to continue later, having Claude Code to summarize the current status and context of the task can be extremely helpful. This way, when you come back to the task later, you and Claude Code can quickly get up to what has been done, what problems have been identified and what needs to be done next. 

**Restart Conversation Instead of Adding Extra Context**: Normally if you find Claude Code is getting confused or lost in the conversation, instead of adding more context to the current conversation, I found restarting a new conversation with the relevant context is a better way to get Claude Code back on track. This is because adding more context to the current conversation can make it even more confusing and its expensive regarding the context window. Restarting a new conversation can give Claude Code a fresh start and make it easier to focus on the task at hand with the chance to optimize your thoughts and input as well.

#### **Challenges and Limitations**

LLMs are still a probability generator by nature so they are not perfect and often can make mistakes. They are good at planning, architecturing, creating diagrams or general things to help any understanding. But you cannot entirely rely on them especially for tasks that require 100% accuracy and precision.

But more importantly, personally I think the challenges and limitations not just come from LLMs, but also relate to the users. After all, at this moment, LLMs are still just tools (although powerful ones). Here are some challenges and limitations I have identified which are common to me during the process of building with Claude Code:

**1. Context Window Limitations**: The context window of LLMs is limited, which is the hardest limit of all LLMs. Claude Code has 200K tokens of the context (Now Sonnet 4 has 1M like Gemini). But closer to their limit, the model tends to forget the earlier context. This is a big and hard challenge for large projects with many files and complex structures.

**2. Downgraded Intelligence**: Recently Anthropic has confirmed there was a period of the accident downgrade of intelligence of Claude Code. Although it's been fixed but this also shows the unreliability of LLMs and the services built on top of them. This can be frastrating especially when you are in the middle of a task and the model suddenly becomes less capable and dumber.


**3. Expectations vs Reality**: I think as users, we need to adjust our expectations and understand the reality of LLMs before we start using them. False expectations can lead to frustration and disappointment which, most of the time, are probably not the fault of LLMs. Like I mentioned, if you want LLMs to perform tasks that requires 100% precision and accuracy, you are likely to be disappointed, this is no difference compared to a lottery draw.

**4. Great Tools but not Suitable**: In my case, Claude Code has implemented `Redis` and `Celery` for the message queue and task system from the early stage. Like other new concepts I learned, I was excited about them and followed Claude Code to implement them. But later on, I found that for my demonstration purposes, they are not practical and necessary to use in production yet not even mentioning the **EXTRA** cost and maintenance they bring if you want to deploy with `AWS`. So I spent quite a while to make the decision and spent almost a week to replace them with `AWS SQS(production)` and `RabbitMQ(local)` which is much easier to use in AWS ecosystem. Switching the gear was hard when you thought you were progressing well. This has been a good lesson for me to think about the practicality of the tools and technologies we use, not just because they are great or popular, or simply, recommended by LLMs.

**5. Learning Curve**: Claude Code has extremely compacted the time to build a project especially if you just want an PoC(Proof of Concept) or MVP(Minimum Viable Product). But its capabilities to speed up the process and show the new concepts/patterns like the ones I have learnt are often also exactly the painful part for users. Like point 3 above, the speed of development and the sea of knowlege LLMs have can often misguide you easily. So the learning curve can be **very** steep if we lose our focus of what we want to achieve.

### Final Thoughts
Despite the harsh challenges and limitations, I believe that with the right mindset and approach, we can leverage the power of LLMs like Claude Code to enhance our development workflows and create better software in a **much much** shorter time.

The positive key build ups of Claude Code have given to me:

#### **1. Accelerated Learning and Developing**:
The building time has been compacted significantly. I would never thought I could built a full-stack application with so many tech stacks plus new concepts within **7 weeks** part-time. In the first blog post of this series the goal was **12 weeks**. It is not perfect but it is working and deployed, and even just thinking about how much I could learn in the future during refactor is exciting.

#### **2. Knowledge Flattening**:
I think with AI tools like Claude Code, the knowledge gap between senior and junior engineers has been flattened or at least reduced. Concepts especially regarding `system design` and `architecture` that traditionally only senior engineers would know and decide have been exposed to junior engineers like me in much earlier stage. This has been a great way to learn and grow, and think about the bigger picture of the project. 

But in another way, knowledge is just one part of the development cycle. This also means junior engineers need to be more **responsible and careful** about the decisions they make with the help of LLMs while senior engineers' experience has never been so important to guide both junior and LLMs to make the right decisions that are practical and suitable for the particular project.

Also I think this is a great era to learn **software engineering** because LLMs have made coding much easier and faster, so we can focus more on the engineering part of the project like system design, architecture, testing, documentation, deployment etc, as well as building **business acumen** to make sure the projects are built and delivered in a good quality.

#### **3. Mirror of Ourselves**:
The more I use Claude Code, the more I realize that LLMs are sometimes the mirror of ourselves. They can be lazy, like us when we just want to use system 1 to provide us intuitive thoughts. They can be overconfident, like us when we think we are right but actually wrong. They can be forgetful when reaching the context limit, like us when we cannot remember what we did a few days ago. But they can also provide a comprehensive plan and execution when given `ultrathink` command, like us when we force ourselves to use system 2 to think harder. Great psychology book like [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow) by Daniel Kahneman has been so interestingly important for us to help us understand ourselves better and nowadays to understand LLMs.

#### **4. Empowering Developers**:
I believe LLMs like Claude Code are not here to replace developers but to empower them, neither juniors and seniors. The encouragement that AI tools like Claude Code have given me to **learn and build** has been tremendous, sure same would apply to the seniors who are using it to bring them next level of knowledge. Even it might just be the **Mount Stupid** phase for me from **Dunning Kruger Effect**, I am still excited about the journey and the possibilities that lie ahead, at least, it's closer to the **Slope of Enlightenment** :)