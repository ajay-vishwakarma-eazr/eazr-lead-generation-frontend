# Beautiful Login v3.0

After taking a look at `Beautiful Login 2`, we decided to rewrite it from the ground up, so you are up-to-date with the latest technologies - and a fresh new design.

Now, we are introducing `Beautiful Login v3.0` the most beautiful and complete solution for your login needs.
With this, we are giving you the basis from where you could write any application you'd like to without having to do all the boilerplate for it (and with Firebase auth out of the box!!).

Focus in the most important things of your project rather than wasting time in this.

## 1. We've listened to all your feedback
and it has been awesome. Here's a list of what you wanted:
- Replace CRA with something simpler and faster: We went with the lightning fast [Vite](https://vitejs.dev/). Making the start of your dev server faster than me saying "Hi!".
- Route management: all your routes are now managed with [React Router v6](https://reactrouter.com/)
- Component library: [Material UI](https://mui.com/) will help you build any app you want
- Animation library: here we went with the best there is [Framer motion](https://framer.com/motion/)
- DARK MODE: yes, it was about time...but it's finally here!

On top of that, we added `Lottie` for those lively illustrations which will make your app one step ahead than the rest.
Last but not least, we are still using Typescript and added [Emotion JS](https://emotion.sh/docs/introduction) for those easy css-in-js we all love.

## 2. Firebase

We are still using Firebase for the authentication. It's still super fast and easy to set up, just create your account and choose your sign in methods.

>This app works with email, Google and Github authentifications. But, we've also included the code for Facebook.

### 2.1. How to?

Here we explain how to configure the Authentication with the different providers (Google, Github, Facebook, etc)

Before you begin:

- Sign into your [Firebase console](https://console.firebase.google.com/) and add a new project.
- Once you added a new project, add a web application and copy the data you get there.

```js
firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
})
```
- Create a `.env` file in the root of the project - use the same keys as shown above adding the prefix `VITE_APP_`. The `.env.d.ts` file is NOT where your keys should be placed, this is just for the typescript autocompletion.
- In the Firebase console, open the Auth section.
- On the Sign in method tab, enable the desired provider.
- Add the Client ID and Client Secret from that provider's developer console to the provider configuration

**Useful links**
[Github new app](https://github.com/settings/applications/new)
[Facebook developer](https://developers.facebook.com/)

### 2.2. Run the app

In the project directory, you can run:

### `yarn run dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.


### `yarn run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## 3. Build something awesome

This should help you get started in your new project as fast as possible. Now the sky is the limit.

Thank you


