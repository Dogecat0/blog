---
title: JavaScript-Full-Stack-Series-02-React
date: 2023-11-08 23:05:34
tags: [JavaScript, Full Stack, React]
---

## **🔎 Intro**

This post will cover React and related concepts like Vite, Components, JSX, etc which comprise the part1-a of the course together with some of my thoughts and lessons learned.
<!-- more -->

## **💡 New concepts**

- React: 
React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently. [More details](https://react.dev/)
- Vite: 
Vite is a modern frontend build tool that provides a faster and leaner development experience for web projects. It uses native ES modules for serving code instead of bundling during development, which results in significantly faster start times. It supports frameworks like React, Vue, Svelte, and more. [Mode details](https://vitejs.dev/)
- React components: 
Components are one of the core concepts of React. They are the foundation upon which you build user interfaces. [More details](https://react.dev/learn/your-first-component)
- JSX: 
JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. React components use JSX to represent the HTML markup. [More details](https://react.dev/learn/writing-markup-with-jsx)<br />
Main rules of JSX:
    - Return a single root element
    - Use camelCase for HTML attributes
    - Close all tags
- Props: Props are short for properties. React components use props to communicate with each other. Every parent component can pass some information to its child components by give them props. [More details](https://react.dev/learn/passing-props-to-a-component)

## **📚 Lessons learned**

- "Software development is hard. It gets even harder if one is not using all the possible available tools such as the web-console and debug printing with console.log. Professionals use both all the time and there is no single reason why a beginner should not adopt the use of these wonderful helper methods that will make life so much easier." - [Full Stack Open](https://fullstackopen.com/en/part1/introduction_to_react#props-passing-data-to-components)
- There are two ways to pass props to React components:
    ``` jsx
    function Header(props) {
        return <h1>{props.course}</h1>;
    }
    ```
    The first way is to pass the props object to the component function and access the properties of the props object with dot notation.
    ``` jsx
    function Header({ course }) {
        return <h1>{course}</h1>;
    }
    ```
    The second way is called destructuring assignment. It is a special syntax for neatly assigning values taken directly from an object to variables.<br>
    (* Comparative thinking: Think of it as a similar way of passing parameters to a function in Python but using different braces.)
