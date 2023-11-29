---
title: JavaScript-Full-Stack-Series-02-State_and_Event_Handlers
date: 2023-11-12 16:45:58
tags: [JavaScript, Full Stack, React]
excerpt: This blog covers some more React component basics, demonstrating helper functions, JavaScript destructuring for cleaner code, and dynamic page rendering in React applications....
---

## 🔎 Intro

This blog covers some more React component basics, demonstrating helper functions, JavaScript destructuring for cleaner code, and dynamic page rendering in React applications.

## 💡 New concepts

- State: 
In React, components need to "remember" things: the current input value, the current image, the shopping cart. In React, this kind of component specfic memory is called state. [More details](https://react.dev/learn/state-a-components-memory)

## 👨‍💻 Reviewed concepts

- Destructuring assignment: 
"Destructuring make sthe assignment of variables very easy since we can use ti to extract and gather the values of an object's properties into separate variables." - [Full Stack Open](https://fullstackopen.com/en/part1/component_state_event_handlers#destructuring). 
- Event Handler

## 📚 Lessons learned

### Destructuring assignment example:

- From this:
```jsx
const Hello = (props) => {

    const name = prop.name
    const age = props.age
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
    }
```
- To this:
```jsx
const Hello = (props) => {

    const { name, age } = props
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}
```
- Then to this:
```jsx
const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```
The props that are passed to the component are destructured directly into variables `name` and `age`. This is a common pattern in React applications.

### Event Handler:

- Event Handler as a Function or Reference: 
An event handler should be either a function or a function reference. Direct function calls as event handlers (like `onClick={setCounter(counter + 1)}`) can lead to errors, as they execute immediately during rendering, causing unintended behavior like infinite re-renders.
- Use of Arrow Functions: 
To prevent immediate execution and control when the event handler is called (like on a user action), arrow functions are used. For example, `onClick={() => setCounter(counter + 1)}` ensures that `setCounter` is called only when the button is clicked.

### Useful Notes:

- "Do not ever try to guess what your code does. It is just better to use `console.log` and see with your own eyes what it does." - [Full Stack Open](https://fullstackopen.com/en/part1/component_state_event_handlers#changes-in-state-cause-rerendering)