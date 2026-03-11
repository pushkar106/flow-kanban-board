# Flow Kanban Board

This project is a simple Kanban-style task board built using React, TypeScript, and Tailwind CSS.
It allows users to manage tasks across three stages: **To Do**, **In Progress**, and **Done**.

The goal of this project was to create a clean and functional task management interface while practicing state management in React and persisting data using localStorage.

## Features

* Add a new task with a title and description
* Move tasks between columns (To Do → In Progress → Done)
* Delete tasks when they are no longer needed
* Data is stored in **localStorage**, so tasks remain after refreshing the page
* Simple and responsive UI built with Tailwind CSS

## Tech Stack

* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **useReducer** for managing application state
* **Vite** for project setup and development server

## Running the Project Locally

Clone the repository and install dependencies:

npm install

Start the development server:

npm run dev

The app will run locally in your browser.

## Project Structure

src
├── components
│   ├── Column.tsx
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
│
├── state
│   └── taskReducer.ts
│
├── types
│   └── task.ts


Pushkar Patil
B.Tech in Computer Science and Engineering (8th Sem)
