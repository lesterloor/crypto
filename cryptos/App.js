import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home.js";
import LoadingScreen from "./screens/LoadingScreen.js";
import API from "./config/api.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentWillMount() {
    setTimeout(
      function() {
        this.setState({ loading: true });
      }.bind(this),
      500
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Home style={styles.container} />
        ) : (
          <LoadingScreen />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
