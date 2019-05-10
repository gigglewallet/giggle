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
Installing ObjectMapper (3.4.2)
Installing Result (4.1.0)
Installing SwiftyJSON (5.0.0)
Installing cocoa_grinwallet (0.1.0)
...
Pod installation complete! There is 1 dependency from the Podfile and 4 total pods installed.
```

If no `pod` command, install it firstly by:
```sh
sudo gem install cocoapods
``` 


## Build

### iOS
- Run the `react-native run-ios` in the root of this project.

or

- Open `GrinCode.xcworkspace` in Xcode and click `run`.
- Hit Cmd+R in your iOS simulator to reload the app and see your change

#### Android
- Open an emulator. 
- Run the `react-native run-android` in the root of this project.


## License

Apache License v2.0.


