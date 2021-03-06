To start run 
`yarn install`

then to get the  project running execute 
`yarn dev`

Note: the build will fail if you don't have a local `.env` folder - talk to uros to 
get access to it 

For local testing with firebase auth go to server repo and check out readme -
make sure to have the following line of code included in the firebaseApp.js
`firebaseApp.auth().useEmulator('http://localhost:9099/');`

At the moment it is environment dependent and set to be enabled only during 
local development

"# react-material-ui-starter" 
