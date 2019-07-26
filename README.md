# Giggle 
IOS Grin wallet for mobile devices (IOS and Android).

# Contributing

## Set up the environment

- Install Xcode build tools:

`xcode-select --install`

- Setting up [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

- Install the npm dependencies:
Clone this repository and go to `react-native-wallet` folder:
```sh
git clone https://github.com/gigglewallet/giggle.git
cd giggle/react-native-wallet
npm install

```

- Install the [cocoapods](https://cocoapods.org/) dependencies
```sh
cd giggle/react-native-wallet/ios
pod install
```

Normally you will see something like:
```sh
Installing OpenSSL (1.0.210)
Installing cocoa_grinwallet (1.0.3)
...
Pod installation complete!
```

If no `pod` command, install it firstly by:
```sh
sudo gem install cocoapods
``` 

After pod installation, you have to manually download the cocoa_grinwallet libraries. Run this:
```Bash
cd giggle/react-native-wallet/ios
./download_grinwallet_libs.sh
```
This script will download the libraries from https://github.com/gottstech/cocoa_grinwallet/releases to local folder `Pods/cocoa_grinwallet/cocoa_grinwallet/Library`.


## Build

### iOS
- Run the `react-native run-ios` in the root of this project.

or

- Open `GrinCode.xcworkspace` in Xcode and click `run`.
- Hit Cmd+R in your iOS simulator to reload the app and see your change

#### Android
- Open an emulator. 
- Run the `react-native run-android` in the root of this project.

## Document

https://github.com/gigglewallet/giggle/wiki

## License

Apache License v2.0.


