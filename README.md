Snippet
============
[![Current Version](https://img.shields.io/badge/version-1.1-green.svg)](https://github.com/1dv023/lc222ak-examination-3) 
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://snippet.lokecarlsson.se) 

This is Loke Carlsson's snippet web application. It is  powered by Socket.io, Express and MongoDB.

![Snippet Preview](http://i.imgur.com/wWhkJVx.png)

## Demo
You can test a fully working live demo at https://snippet.lokecarlsson.se

---

## Features
- Registration of account
- Create, edit and delete of snippets
- Dashboard with full notification of user actions
- Logged in users can live view other users edit snippets in realtime
- Emphasise on security

#### Unregistered useres can:
- View snippets

#### Registered useres can:
 - Create snippets
 - Edit snippets
 - Delete snippets
 - Access the dashboard

---

## Setup
Clone this repo to your machine or server and run the following command to install all the dependencies.
```bash
$ npm install
```

### Optional setup

You can use [this](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps) tutorial to set up git hooks but for the sake of just running the application there is no need.

Install [PM2](https://github.com/Unitech/pm2) to start the node application as a daemon.

Install PM2
```bash
$ npm install pm2 -g
```
Start the application
```bash
$ pm2 start app.js
```

---

## License

This project is licensed under the terms of the **ISC** license.

---

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/made-with-crayons.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)
