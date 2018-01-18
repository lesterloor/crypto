import Ionicons from 'react-native-vector-icons/Ionicons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
export default class Main extends .React.Component{
  static navigationOptions = {
    tabBarLabel: "Coins",
    drawerIcon: () =>{
      return(<Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={20}
          style={{ color: tintColor }}
        />);
    }
  }
  render(){
    return(<View style{styles.cointainer}><Text></Text></View>

    )
  }
}
