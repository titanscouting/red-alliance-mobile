# The Red Alliance - Mobile App

<a href="https://play.google.com/store/apps/details?id=com.redalliance" target="_blank"><img alt="Get it on Google Play" src="https://imgur.com/YQzmZi9.png" width="153" height="46"></a>

# Overview
The Red Alliance mobile application is written in JavaScript with [React Native](https://reactnative.dev/). 

The app allows scouters for FRC teams to collect data about competiting FRC teams. This app is the primary source of data for TRA API and TRA analysis. It features a JSON-configurable scouting GUI for easy customization with match and pit scouting functionality.  

# Build/Run

## Android
**Requirements**
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js LTS](https://nodejs.org/) 
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Java JDK](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
  - You may also use OpenJDK or similar Java implementations

### Setup 
1. Make sure that the `emulator`, `adb`, `yarn`, and `android-studio` executables are in your PATH folders.
  - The `emulator` executable does not need to be present if you are testing on a physical device. If you are, ensure that it is plugged in to your computer and that [ADB debugging mode is enabled](https://developer.android.com/studio/command-line/adb#Enabling).
2. Ensure that all dependencies are installed by running `yarn`.
### Running the app
3. In one terminal window, run `yarn start` to start the code server.
4. In another terminal window, run `yarn run android` to compile the development version of the app and install it on the emulator/physical device.

## iOS
**Requirements**
- [Xcode](https://developer.apple.com/xcode/)
- [Node.js LTS](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [CocoaPods](https://cocoapods.org/)
### Setup
1. Make sure that the CocoaPods executable `pod` are in your PATH folders.
2. Ensure that all dependencies are installed by running `yarn`.
3. Navigate to the `ios` folder and run `pod install`.
### Running the app
4. In Xcode, open the Xcode **workspace** file `ios/RedAlliance.xcworkspace`. 
5. Click the play button in the toolbar.