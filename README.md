[![Build Status](https://travis-ci.org/okawali/Seityan.svg?branch=master)](https://travis-ci.org/okawali/Seityan)
[![Build Status](https://ci.appveyor.com/api/projects/status/github/okawali/Seityan?svg=true)](https://ci.appveyor.com/project/Norgerman/Seityan)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](./LICENSE)
[![LICENSE](https://img.shields.io/badge/license-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

![./doc/img/show.gif](./doc/img/show.gif)


# Seityan

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

> Important!! You will need to ask us the `conf.ts` for building this project, 
> because it contains the secret keys of third-party services. Send an email to 
> [Sunxfancy](mailto:sunxfancy@gmail.com), [Norgerman](mailto:xyn0410@gmail.com) or create a new issue.

Clone this git repository with the following shell code:

```sh
git clone https://github.com/Norgerman/Seityan
```

Install all the dependences with `npm i`:

```sh
cd ./Seityan
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

## License

MIT License for our project.
