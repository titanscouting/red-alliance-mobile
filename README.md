# The Red Alliance - Mobile App

<a href="https://play.google.com/store/apps/details?id=com.redalliance" target="_blank"><img alt="Get it on Google Play" src="https://imgur.com/YQzmZi9.png" width="153" height="46"></a>
<br>
<a href="https://testflight.apple.com/join/Y1x85eWQ" target="_blank"><img alt="Available on Apple TestFlight" src="https://askyourself.app/assets/testflight.png" width="138" height="50"></a>


# Status Badges

[![Build - Android](https://github.com/titanscouting/red-alliance-mobile/actions/workflows/build-android.yml/badge.svg)](https://github.com/titanscouting/red-alliance-mobile/actions/workflows/build-android.yml)

[![Linting](https://github.com/titanscouting/red-alliance-mobile/actions/workflows/lint.yml/badge.svg)](https://github.com/titanscouting/red-alliance-mobile/actions/workflows/lint.yml)

# Overview
The Red Alliance mobile application is written in JavaScript with [React Native](https://reactnative.dev/). 

The app allows scouters for FRC teams to collect data about competiting FRC teams. This app is the primary source of data for TRA API and TRA analysis. It features a JSON-configurable scouting GUI for easy customization with match and pit scouting functionality.  

# Build/Run for Development

## Android
**Requirements**
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js LTS](https://nodejs.org/) 
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Android Studio](https://developer.android.com/studio)
  - You do not need to use Android Studio as the IDE, we just need its build tools and emulator support.
  - Instructions for installing Android Studio on Windows and macOS can be found [here](https://titanscouting.github.io/mobile/android-studio).


### Setup 
1. Make sure that the `emulator`, `adb`, `yarn`, and `android-studio` executables are in your PATH folders.
  - The `emulator` executable does not need to be present if you are testing on a physical device. If you are, ensure that it is plugged in to your computer and that [ADB debugging mode is enabled](https://developer.android.com/studio/command-line/adb#Enabling).
2. Set the `ANDROID_SDK_HOME` environment variable to point to the SDK root directory. 
  * For Windows, it is generally `C:\Users\USERNAME\AppData\Local\Android\Sdk` (replace "USERNAME" with your Windows username.)
3. Set the `JAVA_HOME` environment variable to the Android Studio JRE (generally `C:\Program Files\Android\Android Studio\jre`).
4. Ensure that all dependencies are installed by running `yarn`.
### Running the app
5. In one terminal window, run `yarn start` to start the code server.
6. In another terminal window, run `yarn run android` to compile the development version of the app and install it on the emulator/physical device.
  * Note: there have been issues reported with running this command on Powershell, as the Windows Java install may override the Java included in Android Studio. If there are build errors, try using cmd instead.

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

# Build Production Releases
These releases bundle all JS assets with the app, minify all code, and create an Android App Bundle (AAB) file. This file can then be uploaded to the Google Play developer console for release to the public. 

## Android
1. Navigate to the `android` folder. 
2. In a terminal window, execute `./gradlew bundleRelease`.
  * The output can be found in `android\app\build\outputs\aab`.
  * This step generates an AAB file that can then be uploaded to the Google Play Store to release to devices.
  * To create an APK instead, run `./gradlew assembleRelease`. The APK will be outputted to `android\app\build\outputs\apk`.

## iOS
Building iOS releases is not supported at this time.
