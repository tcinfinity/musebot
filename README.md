# MuseBot

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


If errors occur, try clearing `react-native`  cache by running:

```unix
react-native run-ios -- --reset-cache
```

____

If problems persist, delete the `node_modules/` folder and reinstall all the dependencies again using `npm install`. \\
Ensure that the above steps are then followed, including resetting cache.

Possible known bugs (dependency):

- @babel/core
- @babel/runtime

To fix specific dependency errors, try `npm install --update <dependency>`. \\
If errors remain, completely reinstall the module by deleting it (individually; or grouped - see above) \\
Remember to update the pod files and reset cache as shown above.
