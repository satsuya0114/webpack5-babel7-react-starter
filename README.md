# webpack5-babel7-react17-starter

use

babel after `7.4.0` => `7.12.9`

webpack `5.6.0`

react react-dom `17.0.1`

and use `react-refresh` to replace `react-hot-loader`

---

env requirement:

node >= 10.0.0

yarn >= 1.0.0

recommend to use nvm lts version to install node

---

before run the project use `yarn` or `npm` to install `node_modules`

```
# recommended
yarn install

# or
npm install
```
---

* `npm run localstart` to start at http://localhost:8080 with webpack development mode (use `react-refresh-webpack-plugin`)

* `npm run build` to run webpack production mode and the distination file: ./dist

* `npm start` use express to run http://localhost:3000 (before run `npm start` you should run `npm run build`)

![alt text](https://github.com/satsuya0114/webpack5-babel7-react-starter/blob/main/readme.png)

[live demo](https://webpack5-babel7-react-starter.herokuapp.com/)
