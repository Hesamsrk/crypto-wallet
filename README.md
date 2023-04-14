# Crypto‑wallet: Featuring an efficient way to generate master‑seed

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

## Introduction

A cross-platform cryptocurrency wallet for mobile devices featuring an alternative approach to <a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki">BIP39 mnemonics</a> in creating the master-seed used in <a href="https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png">BIP 32 HD-wallets</a>, that improves user experience and security. This approach is based on an image as a randomization factor, and a multi-pattern as the security element.

## Implementation

The initial implementation is under development for Android and IOS devices, using React‑native.
### Demo

#### This is the initial design of the app pages:

- The splash Page:

  <img alt="Demo page 1" width="250px" src="client/docs/demo/splash.png" />
---------------------------------------------------
- The authentication page:

  <img alt="Demo page 2" width="250px" src="client/docs/demo/page-passCode.png" />
---------------------------------------------------
- The main menu loads in case there is no master seed defined in the storage:

  <img alt="Demo page 3" width="250px" src="client/docs/demo/page-menu.png" />
---------------------------------------------------
- This page helps you to create a new wallet or import your already existing master seed:

  <img alt="Demo page 4" width="250px" src="client/docs/demo/page-importWallet.png" />
---------------------------------------------------
- This is the main panel of the app. Here you can see your assets and their values; you can also transfer your assets in this page or share your public-keys with the payers:

  <img alt="Demo page 5" width="250px" src="client/docs/demo/page-mainPanel.png" />
---------------------------------------------------

### How to run in development environment?

- Install packages:

```shell
npm install
```

- Run:

```shell
npm start
```
