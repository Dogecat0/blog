---
title: JavaScript Full Stack Series-01-Fundamentals
date: 2023-11-07 20:08:19
tags: [Full Stack, JavaScript]
---

## **🔎 Intro**

In this post, I will be covering the fundamentals of web apps, which is the part0 of the course and list the concepts I've reviewed and learned so far.
<!-- more -->

## **💡 New concepts**

- Callback function: 
A callback function is a fuction passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. More details: [Callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) 
- Event handler: 
Event are signals fired inside the browser window that notify of changes in the browser or operating system. Programmers can create event handler code that will run when an event fires, allowing web pages to responde appropriately to change. More details: [Event handler](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers)

(* Comparative thinkging: In Python, you can create an event handler using [Django signals](https://docs.djangoproject.com/en/4.2/topics/signals/) which has the similar mechanism.)
- AJAX (Asynchronous JavaScript and XML): 
AJAX is a set of web development techniques using many web technologies on the client side to create asynchronous web applications. With AJAX, web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. More details: [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)

(* Comparative thinkging: [HTMX](https://htmx.org/docs/) is a modern JavaScript library that allows you to access AJAX, CSS Transitions, WebSockets, and Server-Sent Events directly in HTML, using attributes without writing JavaScript.)
- SPA (Single Page Application)
- JavaScript libraries: 
jQuey, AngularJS, React, Vue.js, Backbone.js, etc.

## **👨‍💻 Reviewed concepts**

- HTML (HyperText Markup Language):
 HTML is the code that is used to structure a web page and its content. [More details](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- CSS (Cascading Style Sheet): 
CSS is the code taht styles web content. [More details](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- HTML forms: 
HTML forms are one of the main points of interaction between a user and a web site or application. Forms allow users to enter data, which is generally sent to a web server for processing and storage. [More details](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form)
- HTTP request
- DOM (Document Objcet Model): 
DOM connects web pages to scripts or programming languages by representing the structure of a document—such as the HTML representing a web page—in memory. The DOM represents a document with a logical tree. [More details](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- Full-stack web development

## **📝 Course exercise:**

1. Review HTML
2. Review CSS
3. Review HTML forms
4. Create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button. Link to the [Submmited diagram](https://github.com/Dogecat0/fullstack_open/blob/main/part0/new_note_diagram.md).
5. Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa. Link to the [Submmited diagram](https://github.com/Dogecat0/fullstack_open/blob/main/part0/spa_diagram.md).
6. Create a diagram depicting the situation where the user creates a new note using the single-page version of the app. Link to the [Submmited diagram](https://github.com/Dogecat0/fullstack_open/blob/main/part0/new_note_spa_diagram.md).