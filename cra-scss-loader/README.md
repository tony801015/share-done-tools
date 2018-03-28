# 在 create-react-app 添加 CSS 預處理器

## 特徵

* [create-react-app](https://github.com/facebook/create-react-app)
* [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)
* [npm-run-all](https://github.com/mysticatea/npm-run-all)

## 安裝

```sh
 yarn add node-sass-chokidar
```

或

```sh
 npm install --save node-sass-chokidar
```

## 使用方法

在`package.json`添加以下兩個指令

```diff
   "scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom"
   }
```

現在可以將 `src/App.css` 重新命名為 `src/App.scss`，然後運行 `yarn run watch-css`，預處理器將輸出`App.css`，所以您只需要引入`App.css`。

> 注意：要使用不同預處理器則需替換 `build-css` 和 `watch-css`

## 整合指令

最後將指令整合至`create-react-app`所產生的`react-script`

安裝`npm-run-all`

```sh
yarn add npm-run-all
```

或

```sh
npm install --save npm-run-all
```

然後替換`package.json`指令

```diff
   "scripts": {
     "build-css": "node-sass-chokidar src/ -o src/",
     "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
+    "start-js": "react-scripts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build-js": "react-scripts build",
+    "build": "npm-run-all build-css build-js",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```

現在您可以執行 `yarn start` 或 `yarn build`。
