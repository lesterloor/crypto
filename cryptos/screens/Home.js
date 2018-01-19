import React from "react";
import SVGImage from "react-native-svg-image";
import {
  Button,
  Platform,
  ScrollView,
  View,
  Text,
  StatusBar
} from "react-native";
import { DrawerNavigator, SafeAreaView } from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoadingScreen from "../screens/LoadingScreen.js";
import axios from "axios";
import api from "../config/api.js";
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
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinData: [],
      topcoins: ["BTC", "LTC", "XRP", "NXT", "ETH", "BCH"],
      coin: []
    };
  }

  componentWillMount() {
    api.getCoinData().then(res => {
      // console.log(res.data.result);

      // console.log(Object.values(result));
      // values = Object.values(result.data.Data).map((l, i) => {
      //   // console.log(l.CoinName);
      // });
      // console.log(result);

      this.setState({
        coinData: res.data.Data
      });
    });
  }

  render() {
    const coinData = this.state.coinData;
    const result = Object.values(this.state.coinData);
    let TopCoins = this.state.topcoins;
    var TopCoinsFilter = result.filter(function(e) {
      return TopCoins.indexOf(e.Symbol) != -1;
    });
    console.log(TopCoinsFilter);
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
            <Icon
              name="menu"
              onPress={() => navigation.navigate("DrawerOpen")}
            />
          </Right>
        </Header>
        {this.state.coinData.length < 1 ? (
          <Content>
            <Text>Loading...</Text>
          </Content>
        ) : (
          <Content>
            <List>
              {TopCoinsFilter.map((l, i) => (
                <ListItem key={i} avatar>
                  <Left>
                    <Thumbnail
                      square
                      small
                      source={{
                        uri: `https://www.cryptocompare.com/media${l.ImageUrl}`
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{l.CoinName}</Text>
                    <Text note>{l.Symbol}</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              ))}
            </List>
          </Content>
        )}
      </Container>
    );
    const titles = "tyitle";

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

    return <RootTabs />;
  }
}
