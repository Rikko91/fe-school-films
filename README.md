
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
yarn run serve
```
Also you need to run json-server as a backend part. You can do this in different ways:
```
npm install -g json-server
json-server db.json -m ./node_modules/json-server-auth
```
Or if you don`t want to install json-server globally you can run it by npx:
```
npx json-server db.json -m ./node_modules/json-server-auth
```

To check all functionality you can use this user credentials:  
email -> oleg.rikko91@gmail.com  
password -> 12345
