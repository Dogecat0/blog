---
title: JavaScript-Full-Stack-Series-03-Altering-Data-from-Server
date: 2023-12-03 15:26:20
tags: [JavaScript, Full Stack, React, REST]
---

## 🔎 Intro

This blog will touch the base of sosme conventions used by jason-server and REST APIS in general, taking a look at the URLs and HTTP request types, in REST.

<!-- more -->

## 💡 New concepts

- Object spread syntax:
The object spread syntax is a JavaScript feature that is used to make shallow copies of JavaScript objects. [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## 👨‍💻 Reviewed concepts

- REST:
REST stands for Representational State Transfer. It is a software architectural style that defines a set of constraints to be used for creating Web services. In REST terminology, we refer to individual data objects, such as the notes in our application, as resources. Every resource has a unique address associated with it - its URL.
- 'S'OLID:
Single responsibility principle, is a computer-programming principle that states that every module, class or function in a computer program should have responsibility over a single part of that program's functionality, which it should encapsulate. [More details](https://en.wikipedia.org/wiki/Single_responsibility_principle)
- Promise:
The promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. [More details](https://dogecat0.github.io/2023/11/30/JavaScript-Full-Stack-Series/03-Get-Data-from-Server.html)
In front-end development, we often use promises to handle asynchronous operations such as network requests by using fetch method. [More details](https://javascript.info/promise-chaining#bigger-example-fetch)
- then():
The then() method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise. [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- catch():
The catch() method returns a Promise and deals with rejected cases only. It behaves the same as calling Promise.prototype.then(undefined, onRejected) (in fact, calling obj.catch(onRejected) internally calls obj.then(undefined, onRejected)). [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

## 📚 Lessons learned

### The palcement of `useEffect` hook:

The `useEffect` is deigned to be called unconditionally at the top level of React component. The placement of the useEffect call at the top, middle, or end of the component function is a matter of preference and readability as long as it is in the function body of the component and not inside any conditionals or loops. [More details](https://react.dev/reference/react/useEffect)

## 📝 Course exercise

1. Updates to part2 exercise phonebook with CRUD operations. [Link to the repo](https://github.com/Dogecat0/fullstack_open/tree/main/part2/phonebook)