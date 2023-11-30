---
title: JavaScript-Full-Stack-Series-03-Forms
date: 2023-11-29 09:42:00
tags: [JavaScript, Full Stack, React, Forms]
---

## 🔎 Intro
This blog covers how to handle forms in React, how to use the `useState` hook to handle the state of the form and more related concepts.
<!-- more -->

## 💡 New concepts
- useState hook:
The `useState` hook is a function that takes in an initial value and returns an array of two items using array destructuring: the current state and a function that updates it. [More details](https://react.dev/reference/react/useState)
- Controlled component:
In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`. [More details](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)

## 📚 Lessons learned

### Three important parts of a form:

- onSubmit:
Attached to a form element, `onSubmit` is an event handler triggered when the form is submitted, typically when the user clicks a submit button.
- input value attribute:
This attribute is used to set the initial value of the input element. This cannot be edited.
- onChange:
To enable editing of the input element, we have to attach an `onChange` event handler to the input element. This event handler is triggered every time the value of the input element changes, i.e. when the user types something into the input field.
- if else statement:
In JavaScript, the ternary operator `condition ? exprIfTrue : exprIfFalse` is used to conditionally render something. Alternatively, we can also use the `if else` statement to conditionally do the same job.
```jsx
if (condition) {
  // do something
} else {
  // do something else
}
```
```jsx
condition ? 
  // do something
  : 
  // do something else
```

### Refactoring the code to use multiple components:

-  Keep the state in the parent component.
-  Pass the state and event handler down to the child component as props.
-  The child component calls the event handler with the appropriate parameters.
