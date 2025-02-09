# Fetch.com - Take Home Assignment
- React + TypeScript + Vite
- Fetch for API calls
- Tailwind CSS for styling
- MaterialUI for some components

## live demo
[https://magaliechetrit.com/side-projects/fetch-com/](https://magaliechetrit.com/side-projects/fetch-com/)

## Instructions
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Features
- [x] Separation of private and public routing
- [x] Login to API endpoint with username and password
- [ ] Appropriate human error messages (UX)
- [x] Fetch a list of dogs from the API sorted by breed
- [x] Users should be able to login (through a login screen and authenticate via the API)
- [x] After authentication, users should be able to see a list of dogs on a searchPage.
- [x] Users must be able to filter by breed
- [x] Users should be able to modify this sort by breed to be ascending or descending.
- [x] Pagination
- [x] All fields of the Dog object (except for id) must be presented in some form
- [x] Generate matches based upon favorite dogs.

### Known issues
- Styling
- Zip Code is not implemented well.

### Notes on the implementation
- I chose to make sure that the core functionality was implemented before focusing on design. Design is easier to change than functionality.
- I chose to use Tailwind CSS for styling. I don't have a lot of experience with it and this is a good opportunity to learn more about it. The trickiest for me is how to apply cascading strategy (`@theme`, `@apply` etc).
- About Axios / Fetch. ~~Due to time restrictions, I chose Axios. Fetch wouldn't have been that much different in this case. I have experience with both. However, I do believe that they both have their own use benefits. Fetch has a cleaner API, but Axios has more features out of the box. Implementing Fetch does cause more code. Leverage depends on the project, developers etc.~~ I switched from Axios to Fetch due to Axios URL-encoding.

### Problems I encountered
- At one point I only saw chiuauhas as results, this was because of the search query. This is where I switched from Axios to Fetch.
- I took out most of the MaterialUI components because I didn't like the design. It made the process quite messy. I used the drawer and the button components.
- I had to switch from Axios to Fetch because Axios URL-encoded the request (in search and pagination). It didn't make sense to make a function for a function. No Need for a Custom Query String Converter, Prevents Encoding Issues


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
