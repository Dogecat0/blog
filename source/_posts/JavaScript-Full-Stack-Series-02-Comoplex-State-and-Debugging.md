---
title: JavaScript-Full-Stack-Series-02-Comoplex_State_and_Debugging
date: 2023-11-12 22:32:56
tags: [JavaScript, Full Stack, React]
excerpt: This blog covers some more complex React state related knowledge, demonstrating some ways to debug React apps...
---

## 🔎 Intro

This blog covers some more complex React state related knowledge, as well as some ways to debug React apps. This part of the course covers quite a bit of new concpets and theoretical details, which requires more time to digest and practice. 

## 💡 New concepts

- Batching:
 React batches state updates to improve performance. This means that multiple setState() calls in a single component are batched together by React into a single update for the DOM. React processes state updates after event handlers have finished running.
- Updater function: 
The updater function is a function that is passed to the setState() method, e.g. you can use `setNumber(n => n + 1)` to update some state multiple times in one event.
- Hooks:
Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes. [More details](https://react.dev/reference/react/hooks)
Rules of hooks: 
Hooks are JavaScript functions, but they impose two additional rules:
- Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions.

Examples:
```jsx
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```
- Spread Operator: `...`The spread operator is used to expand elements of an iterable (like an array) into individual elements. [More details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Why use spread operator in React?
- It is used to make a copy of an object or an array. to make sure the original state is not mutated.
- By creating a new boject or array, you ensure that React recognizes the change in the state and re-renders the component accordingly.

## 👨‍💻 Reviewed concepts

- Event Handling:
Event handlers must always be a function or a reference to a function. The button will not work if the event handler is set to a variable of any other type.

## 📝 Course exercise:

1. Create a React app that displays the statistics of a feedback form. [Link to the repo](https://github.com/Dogecat0/fullstack_open/tree/main/part1/unicafe)
2. Create a React app that displays random anecdotes and the most voted one. [Link to the repo](https://github.com/Dogecat0/fullstack_open/tree/main/part1/anecdotes)