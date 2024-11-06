# Catalog App - TechnoNext React Native Developer Assignment

## How to Run the Application

### Prerequisites

```shell
Node.js (>= 14.x.x)

Pnpm

Expo CLI

Android Studio / Xcode (for running on emulators or physical devices)
```

### Installation

1. Clone this repository:

```
git clone git@github.com:mrpmohiburrahman/catalogapptechnonext.git

cd catalog-app
```

2. Install dependencies using Pnpm:

```
pnpm install
```

3.  Install Expo CLI globally (if not already installed):

```
npm install -g expo-cli
```

### Running the Application

Start the app:

```
pnpm ios
pnpm android
```

Scan the QR code using the Expo Go app on your device, or use an Android/iOS emulator to run the app.

### Libraries Used

- Redux Toolkit: State management for products, cart, and location (@reduxjs/toolkit).

- RTK Query: For handling network requests (@reduxjs/toolkit/query).

- react-native-mmkv: Used for offline data storage and caching.

- react-native-maps: To display maps and the user's location.

- Expo Location: To handle location permissions and get the user's latitude/longitude.

### Notes

The project uses Expo, which makes it easier to run across multiple platforms without needing native configurations.

The native timestamp feature was implemented as part of Phase 3, which required diving into native Android (Java) and iOS (Objective-C) development.

## Overview

This repository contains a catalog mobile application built using React Native, following the requirements of the TechnoNext React Native Developer Assignment. The app retrieves product data from Fake Store API and offers features such as displaying product lists, adding to cart, viewing product details, handling offline support, and more.

## Completed Phases and Challenges

### Phase 1

Home Screen: Displayed 10 products using the Fake Store API with sorting options for ascending and descending prices.

1. Location Feature: Implemented location permission handling and successfully retrieved the user's current latitude and longitude to store it in the Redux state.

1. Product Details Screen: Built a screen to show detailed information for each product, allowing users to add products to the cart.

1. Map Screen: Rendered a map screen pointing to the user's current location using react-native-maps.

1. Cart Management: Created a cart screen to add, remove, and change the quantity of items, storing this data in Redux.

### Phase 2

Offline Support: Implemented offline caching to view previously seen products even when the device is offline using react-native-mmkv. Built a "History" screen to display the cached products and handle switching between online and offline gracefully.

Challenges: Properly managing the transition between online and offline states was challenging, as it involved ensuring the UI reflected accurate data based on network conditions. I also had to make sure that data caching and syncing were properly integrated using react-native-mmkv.

### Phase 3

Native Module for Timestamps: Developed a native module (both iOS and Android) to emit the current timestamp every 20 seconds, using GCD Timer in Objective-C for iOS and Handler in Java for Android.

Timestamp Display: Displayed the timestamp in the home screen in a fixed, floated position.

Challenges: Working with native code was quite challenging, especially ensuring that both Android and iOS codebases worked consistently. I faced issues around creating and managing background timers and ensuring they did not affect app performance. Additionally, integrating these native modules with JavaScript was a learning experience.
