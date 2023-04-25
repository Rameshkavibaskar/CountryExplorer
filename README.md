# CountryExplorer
RN - SKY - TEST

# Requirements #
Node 12 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

You also need to install the dependencies required by React Native.
Go to the React Native environment setup, then select React Native CLI Quickstart tab.
Follow instructions for your given development OS and target OS.

# Quick summary#
* npm install
* npm start to start the metro bundler, in a dedicated terminal
* for iOS you have install pod files; cd ios && pod install
* for Android clean gradle file; cd android; ./gradlew clean
* yarn <platform> to run the platform application (remember to start a simulator or connect a device)

# Content #
The project contains:

* A React Native (v0.71.7) application (in "ejected" mode to allow using dependencies that rely on native code)
* Redux (v8.0.5) to help manage state
* React Navigation (v6) to handle routing and navigation in the app, with a splash screen setup by default
* Redux Toolkit (Query) (v^1.9.3) to improve redux api calls
* prettier and eslint preconfigured for React Native

# Redux store #
This boilerplate use Redux-Toolkit and RTKQuery to deal with business side. We use them because they are often used by the community, very trendy and easy to debug.

RTKQuery is a powerful data fetching and caching tool. So we using it for asynchronous api calls.

Redux-Toolkit is intended to be the standard way to write Redux logic. So we using it for synchronous operations.