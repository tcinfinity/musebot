# MuseNet v1

## Introduction

MuseBot is a React Native application powered by machine learning, which has the aim of generating pop music on the go.

## Demonstration

Watch a demonstration here at https://youtu.be/Ge8i3jCTnMU

## Installation

First, run `npm init` to ensure project is recognised as an npm project.

Next, run `npm install` to download all the dependencies.

## Running

```unix
cd ios
pod install

cd ..
react-native run-ios
```

____

If errors occur, try clearing `react-native`  cache by running:

```unix
react-native run-ios -- --reset-cache
```

If more problems persist, deleted the `node_modules/` folder and reinstalling all the dependecies by regenerating the model dependencies again. \\
Ensure that the above steps are then followed.
