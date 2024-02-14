# Piratest - React JS Development Test

This project is a dynamic and visually appealing website inspired by Pinterest, developed using React JS. It includes features such as authentication, image galleries, collaborative image uploads, and more. The project utilizes Firebase Authentication for user registration and login, as well as Firestore for real-time data storage.

## Deploy
This page was deployed on the next link:
[Piratest](https://piratest.vercel.app/)

## Requirements

1. **Authentication and Registration:**
   - Implemented registration and login pages.
   - Integrated with Firebase Authentication to allow access using Google accounts.
   - Enabled registration using email with fields for username, email, and password.

2. **Post-Registration Features:**
   - Display images based on the provided mockup.
   - Implemented infinite scrolling.
   - Consumed the Imgur API for image data.
   - Added a search bar to filter images based on tags, following [Imgur API documentation](https://apidocs.imgur.com/#0f89160b-8bb3-40c5-b17b-a02cc8a2f73d).
   - Enabled full-screen image view with maintained quality.
   - Included a logout option.

3. **Collaborative Image Section:**
   - Users can upload their images, stored in Firestore.
   - Real-time update of images uploaded by other users in the same section.

4. **Additional Points:**
   - Implemented smooth scrolling.
   - Integrated loaders for better user experience.
   - Developed unit tests.
   - Utilized lazy loading for image optimization.
   - Application developed in TypeScript.

## Technologies and Dependencies

- [Firebase](https://firebase.google.com/) - Authentication, store and Firestore.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management library.
- [NextUI](https://nextui.org/) - React UI framework.
- [Axios](https://axios-http.com/) - Promise-based HTTP client.
- [React Router](https://reactrouter.com/) - Declarative routing for React.js.
- [React Hook Form](https://react-hook-form.com/) - Library for managing forms in React.
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Toast notifications.
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React.
- [Sass](https://sass-lang.com/) - CSS extension language.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [UUID](https://github.com/uuidjs/uuid) - Library for generating UUIDs.
- [Pixabay](https://pixabay.com/api/docs/) - Image hosting and sharing API.

## Project Structure

- **components:** Reusable UI components organized into subfolders for better structure.
- **pages:** Main components representing different pages/routes in the application.
- **interfaces:** TypeScript interfaces for data structures.
- **mappers:** Functions for mapping and transforming data.
- **enums:** Enumerations for representing sets of constants.
- **constants:** General constants used throughout the application.
- **repositories:** Modules for interacting with external services, such as Firestore.
- **hooks:** Custom React hooks.
- **store:** Redux store configuration, thunks, and slices.

## Development Patterns

- **Mapping:** Efficiently mapped and transformed data using mapping functions.
- **Reusability:** Utilized reusable components for a modular and maintainable codebase.
- **Services:** Implemented various services such as Auth, Gallery, and Error handling.
- **Redux with Async Thunks:** Leveraged Redux Toolkit for state management, especially for handling asynchronous operations.
- **Repositories:** Used repository pattern for Firestore interaction.
- **Lazy Loading:** Applied lazy loading to optimize image loading.
- **TypeScript:** Full utilization of TypeScript for a strongly typed development experience.

## Scripts

- **dev:** Run the development server using Vite.
- **build:** Build the project using TypeScript and Vite.
- **lint:** Lint the code using ESLint.
- **preview:** Preview the built project.
- **format:** Format the code using Prettier.

## How to Run

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the development server using `npm run dev`.
4. Open the application in your browser.

Feel free to explore and enhance the codebase further!