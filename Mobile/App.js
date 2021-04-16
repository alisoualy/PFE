import { View,Text } from 'react-native'
import Providers from './src/Navigation';
import React from 'react'
import PushNotification from "react-native-push-notification";

const App = () => {

  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);

    },

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
 
  return <Providers />;
}

export default App;
