import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootTabs from "../screens/Drawer.js";
import API from "../config/api.js";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllCoins: ""
    };
  }
  componentDidMount() {
    const hello = "hello";
  }

  render() {
    const hello = "hello";
    console.log(this.state.AllCoins);
    return <RootTabs hellos={hello} />;
  }
}
