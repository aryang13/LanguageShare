# Welcome to LanguageShare! 

To get started with this project, clone the repository to your machine. 

Then, open the project and run
```
cd frontend
yarn install
cd ..\backend
yarn install
```

To run the frontend: 

In `frontend\src`, create a file named `secrets.json` and add the following lines of code:

```
export const googleAPIKey = "<YOUR GOOGLE API KEY>"
export const authToken = "<YOUR AUTH TOKEN HERE>";
export const localUuid = '<YOUR NAME HERE.'
```

Then run `npm start`.

To run the backend: From root, `cd backend && npm start`.

Read more about our project on [Devpost](https://devpost.com/software/languageshare)!
