# react-material-ui-starter
## starter repo for all react + firebase + material ui projects
  
To start run 
`yarn install`

then to get the  project running execute 
`yarn dev`

Note: the build will fail if you don't have a local `.env` folder 
with the following contents that you will get from your `console.firebase.com`

it should look like this:
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_SENDER_ID=
REACT_APP_SERVER_URL=
REACT_APP_ENVIRONMENT=
REACT_APP_CLIENT_URL=


For local testing with firebase auth go to server repo and check out readme -
make sure to have the following line of code included in the firebaseApp.js
`firebaseApp.auth().useEmulator('http://localhost:9099/');`

At the moment it is environment dependent and set to be enabled only during 
local development

