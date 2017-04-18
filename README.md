[![Build Status](https://travis-ci.org/Norgerman/live2d-electron.svg?branch=master)](https://travis-ci.org/Norgerman/live2d-electron)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/Norgerman/live2d-electron?svg=true)](https://ci.appveyor.com/project/Norgerman/live2d-electron)


![./doc/img/show.gif](./doc/img/show.gif)


# live2d-election

Live2D is a set of software and tools that turn 2D artwork into animations applicable to a variety of mediums and platforms, from games to animated movies.

This project is a electron version of live2d-html project. It can interact with your mouse click and native speaking by doing some actions for you.

All listening and speaking of the robot are in chinese, and there are no english version of the robot now. (But you can just put it on your desktop for ... decoration?)

## Features

1. Tracking cursor
2. Lip sync with the voice
3. Chatting in chinese
4. Replacing model
5. Import user model
6. Other feautres of chatting robot(searching, asking weather...)

## Robot services

It uses zhima(知麻) robot to translate the chinese sentences to the intent codes. With a hand writing execution engine, it can execute the instructions of user which it understood. It also use xunfei(讯飞) engine to achieve speech recognition and synthesis. 


## Build from source

Clone this git repository with the following shell code:

```sh
git clone https://github.com/Norgerman/live2d-electron
```

Install all the dependences with `npm i`:

```sh
cd ./live2d-electron
npm i
```

Run building script:

```sh
npm run build
```

Or, you can build the code in the watching mode.

```sh
npm run watch
```

To run the project, using `npm start`:

```sh
npm start
```
