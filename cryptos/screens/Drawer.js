import React from "react";
import { Button, Platform, ScrollView, Text, StatusBar } from "react-native";
import { DrawerNavigator, SafeAreaView } from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import API from "../config/api.js";
import {
  Container,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Thumbnail,
  Body,
  Right,
  Icon,
  Title
} from "native-base";
import axios from "axios";
handleClick = () => {
  this.props.updateState();
  console.log("Pressed!!!");
};
const MyNavScreen = ({ navigation, banner }) => (
  <Container>
    <Header>
      <Left>
        <Icon name="arrow-back" onPress={() => navigation.goBack(null)} />
      </Left>
      <Body>
        <Title>{banner}</Title>
      </Body>
      <Right>
        <Icon name="menu" onPress={() => navigation.navigate("DrawerOpen")} />
      </Right>
    </Header>
    <Content>
      <List>
        <ListItem
          onPress={() => this.handleClick}
          avatar
          style={{ marginLeft: 0 }}
        >
          <Left>
            <Thumbnail source={{ uri: "Image URL" }} />
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Btc</Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
      </List>
    </Content>
  </Container>
);
let url = "https://www.cryptocompare.com/api/data/coinlist/";

const titles = "title";
const InboxScreen = ({ navigation }) => (
  <MyNavScreen banner={titles} navigation={navigation} />
);
InboxScreen.navigationOptions = {
  drawerLabel: "Inbox",
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name="move-to-inbox"
      size={24}
      style={{ color: tintColor }}
    />
  )
};
const DraftsScreen = ({ navigation }) => {
  console.log("screen");
  return <MyNavScreen banner={titles} navigation={navigation} />;
};
DraftsScreen.navigationOptions = {
  drawerLabel: "Drafts",
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  )
};

const RootTabs = DrawerNavigator(
  {
    Inbox: {
      path: "/",
      screen: InboxScreen
    },
    Drafts: {
      path: "/sent",
      screen: DraftsScreen
    }
  },
  {
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    initialRouteName: "Drafts",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

export default RootTabs;
