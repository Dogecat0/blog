---
title: JavaScript Full Stack Series-03-Get Data from Server
date: 2023-11-30 12:33:18
tags: [JavaScript, Full Stack, React, axios]
---

### **🔎 Intro**

This blog will touch the base of how to interact with server in React, how to use the `useEffect` hook to fetch data from server and more related concepts like `fetch`, `promises`, `event loop`.

<!-- more -->

### **💡 New concepts**

- Fetch method:
  The fetch() method starts the process of fetching a resource from the network, returning a promise which is fulfilled once the response is available. [More details](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
- Promise:
  The promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Event loop:
  The event loop is a programming construct or design pattern that waits for and dispatches events or messages in a program. [More details](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- useEffect hook:
  The `useEffect` is a React Hook that lets your synchronize a component with an external system. [More details](https://react.dev/reference/react/useEffect)

### **📚 Lessons learned**

### **The `{}` you see when accessing base url of a server**

During the course we're using JSON server. When you access the base url of a server, you will see a `{}`. This is because the server is returning a JSON object. The `{}` is the representation of the JSON object in the browser. This is not an eeror or problem, it is just how JSON Server handles requests to the root URL.
