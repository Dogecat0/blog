---
title: From Static to Dynamic - A Foundational Refactor for Synapse
date: 2023-10-27 10:00:00
tags:
- refactoring
- architecture
- prisma
- LLM
categories:
- Journal App
---

Technical debt often manifests as rigidity. Our application's journal feature was a prime example, built on a hardcoded assumption that all activities were either "Work" or "Life". This was simple to implement initially but impossible to scale. Every user's life is more nuanced than that binary choice.

This post outlines a foundational refactor to move from this static system to a dynamic, user-driven one.

<!-- more -->

### The Foundational Shift: The Data Model

The core of the problem was in the database schema. An activity was tied to a simple string.

**Before:**
```prisma
// prisma/schema.prisma

model Activity {
  id          String   @id
  description String
  // ...
  category    String // "WORK" or "LIFE"
}
```

This was replaced by a proper relationship. We introduced a **Category** model and linked **Activity** to it via a foreign key.

```prisma
// prisma/schema.prisma

model Activity {
  id          String   @id
  description String
  // ...
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId String
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?
  color       String   @default("#6B7280")
  // ...
  activities Activity[]
}
```

This simple schema change is the bedrock of the new system, enabling users to create, update, and delete their own categories. Naturally, this required building out a new set of CRUD API endpoints under /api/categories and a corresponding management UI.

### The Payoff: An Intelligent Import Agent

With a dynamic category system in place, we could deprecate our old, local-only import script and build something far more powerful: an LLM-powered import UI.

The new `/api/import` endpoint uses a streaming API to provide real-time feedback to the user. Before calling the LLM, our backend agent now:

1.  Fetches all of the user's custom categories from the database.
2.  Injects the category `name` and `description` into the LLM's system prompt as classification context.

This allows the AI to accurately classify plain-text journal entries against a user's unique schema, not a set of hardcoded rules.

The API contract for creating entries was also simplified. Instead of separate arrays for different categories, we now accept a single, unified `activities` array, which is cleaner and more scalable.

### Conclusion

By addressing the inflexibility at the data model level, we not only paid down the technical debt (A debt of one or two days, thanks for my AI assistants) but also unlocked a much more powerful and intelligent feature set to allow the user to have a more personalized and meaningful journaling experience, in this case (Me!).