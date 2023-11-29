---
title: JavaScript-Full-Stack-Series-02-JavaScript
date: 2023-11-09 23:22:22
tags: [JavaScript, Full Stack]
---

## 🔎 Intro

This post covers the basics of JavaScript together with the new concepts and lessons learned during this part of the course.
<!-- more -->

## 💡 New concepts

### Variables

- const: 
The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned.
- let: 
The let statement declares a block-scoped local variable, optionally initializing it to a value.

### Arrays

- Concat(): 
The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
- Destructuring assignment: 
The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. 

### Objects

- Object literal: 
An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces ({}).
- Object methods and "this": 
A method is a function which is a property of an object. It is called using the syntax objectName.methodName(). In a method, this refers to the owner object. In other words, this.firstName means the firstName property of this object. [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- Bind: 
The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## 📚 Lessons learned

- There are many similarities between JavaScript and Python, such as the syntax of for loop, functions like `map`, `reduce`, etc. However, there are also many differences between them, such as the way of declaring variables, the way of creating functions, etc. In short, the syntax of JavaScript is slightly a confusing thing for me so far when, unfortunately, everytime Python comes to my mind first. At the moment they're like two angles fighting in my head...😂

## 📝 Course exercise

1. A simple React app that displays some contents of courses. [Link to the repo](https://github.com/Dogecat0/fullstack_open/tree/main/part1/courseinfo)