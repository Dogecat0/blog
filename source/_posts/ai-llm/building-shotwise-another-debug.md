---
title: "From Hobby Photos to Shotwise: Building an AI Photo Critique App"
date: 2025-11-30 18:00:00
tags:
  - nextjs
  - react
  - typescript
  - stripe
  - supabase
  - gemini
  - ai
  - photography
categories:
  - AI Development
  - Shotwise
---

Spent the last couple of nights (~20 hours) turning one of the “life outside building” ideas into an actual app.

It’s called Shotwise: upload a photo, get an AI critique, then generate an improved version.

This one was very different from my other project (Aperilex). Aperilex is a slow, deliberate learning grind; Shotwise is much more of a controlled dopamine sprint.

<!-- more -->

### From “Life Outside Building” Idea to App

This all started from one of the “life outside building” series ideas that wouldn’t leave my head. Instead of letting it sit as a note, I decided to see how far I could push it in a short, intense window.

I ended up spending a couple of nights, roughly 20+ hours, to convert that idea into an actual app. It’s been a very satisfying validation process on two fronts:

1. Using the latest AI tools to quickly put everything together and deploy a real app with a modern stack.
2. Converting a hobby (photography and critique) into something executable and interactive, instead of just a personal obsession.

### A Controlled Dopamine Sprint vs Slow Learning Projects

Compared to [Aperilex](https://www.aperilexlabs.com), this feels like the opposite style of building.

Aperilex is a slow and dedicated learning project: understand every abstraction, rebuild pieces by hand, treat it like a long-term craft project.

Shotwise is the “I want a dopamine rush” project I’ve been wanting for a while:

- Next.js 16 + React 19 + Tailwind v4 brutalist theme on the frontend
- Prisma/Postgres, Supabase storage, Stripe billing, NextAuth Google, Gemini APIs on the backend
- Vercel for deployment
- Antigravity for frontend UI help, Codex for backend wiring

The satisfying part was seeing how quickly all of this can come together when you lean into AI tooling:

- Sketch UX and flows → turn into real components fast
- Wire up auth, billing, storage, and rate limits with AI doing ~80% of the boilerplate
- Still needing to think seriously about structure, security, and edge cases
- Get to a deployed app in nights

### Can AI Critique Photos in a Structured Way?

I’ve always felt that photography critique is very subjective. Two people can look at the same portrait or product shot and argue forever about whether it’s “good”.

Shotwise is my attempt to ask a more structured question:

> Can we validate a photo with AI and output a structured critique list so we actually know _why_ it’s good or bad, and _where_ to improve?

Instead of vague “nice shot” feedback, the app tries to produce an explicit checklist:

- What works: lighting, framing, expression, background, styling, etc.
- What doesn’t: clutter, pose issues, contrast problems, color balance, composition flaws
- Concrete edit instructions: things a second model (the generator) can follow to create an improved version

That’s the core loop:  
one model reviews → one model rebuilds the frame.

### Prompt and Schema Design Work

A lot of the effort wasn’t just coding, but _shaping_ how the models behave.

Some of the main pieces:

- Using strict Zod schemas to force structured critique JSON instead of “vibes only” paragraphs
- Making the critique output explicit about strengths vs weaknesses vs actionable edits
- Separating “locked” vs “flexible” elements
  - e.g. keep the subject, outfit, and general pose
  - allow background, lighting, and secondary styling to change
- Being clear about camera geometry and perspective so the generator doesn’t go off the rails
- Tuning “revision strength” so the image evolves instead of turning into a completely different photo

This is where Supabase, Prisma, Stripe, etc. feel relatively straightforward, and prompt / schema design becomes the real design problem.

### Tech Stack Reality Check

On the infra side, Shotwise is also a good practice ground for the full stack:

- Next.js 16 App Router + React 19 + Tailwind v4 brutalist UI
- Prisma/Postgres for data model: users, subscriptions, photo sessions, critiques, generated images, usage events
- Supabase for storage: uploads and generated images
- Stripe for subscriptions, quotas, and usage tracking
- Google auth via NextAuth + Prisma adapter
- Gemini for both critique and image generation
- Vercel for deployment, with rate limiting, environment config, and all the usual moving parts

UX matters a lot here, even for an MVP. The first experience — landing → upload → critique → generation → result — needed to feel coherent and smooth, not like a loose collection of API demos.

### The “Is This a Product?” Question

The most interesting part: I put a subscription plan in there.

Stripe plans, quotas, usage tracking, billing portal, the whole SaaS setup. On paper, this looks like a product. Deep down, there is clearly a desire to treat it like a business product.

But after some careful thinking, I realized something:

- I’m not sure I’m ready yet to go talk to potential “customers.”
- I don’t really want to “advertise” it or run a proper go-to-market motion right now.
- I feel more comfortable sharing what the project does and why I built it to satisfy my own urge to build.

So for the moment, the business layer is wired up, but emotionally it’s still in “build log” mode, not “launch announcement” mode.

### For Now: More Than a Toy, Less Than a Company

Right now, Shotwise sits in a middle ground that I actually like:

- More than a toy, less than a company
- A real deployed app with auth, billing, quotas, storage, and infra in place
- A sandbox to practice prompt engineering, UX, security, and architecture with real constraints

And importantly, it’s proof to myself that I can take an idea from the “life outside building” notes and turn it into a working app in a short, intense window using modern AI tools.

I’m sharing this less as a launch and more as a build story.

At some point I might be ready to talk to users, niche down (maybe just profile photos or product shots), and treat this as a serious product. For now, I’m enjoying the phase where you build the thing you can’t get out of your head and see how far you can push it.
