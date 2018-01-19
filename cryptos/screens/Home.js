import React from "react";
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
      coin: []
    };
  }

  componentWillMount() {
    api.getCoinData().then(res => {
      this.setState({
        coinData: res
      });
    });
  }

  render() {
    const coinData = this.state.coinData;
    console.log(Object.keys(this.state.coinData).length);
    console.log(coinData);
    // console.log("Loaded? ", this.state.coinData);
    // console.log("Loaded? ", this.state.coinData);
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
        {Object.keys(this.state.coinData).length < 0 ? (
          <Content>
            <View>
              <LoadingScreen />
            </View>
          </Content>
        ) : (
          <Content>
            {coinData.map((l, i) => (
              <ListItem
                key={i}
                avatar
                style={{ marginLeft: 0 }}
                onPress={() =>
                  navigate("CoinChart", {
                    coindData: l,
                    coinName: l.name,
                    coinPrice: l.price_usd,
                    percentChange_1h: l.percent_change_24h,
                    percentChange_24h: l.percent_change_24h,
                    percentChange_7d: l.percent_change_7d,
                    coinMarketCap: l.market_cap_usd,
                    coinSymbol: l.symbol
                  })
                }
              >
                <Left />
                <Body>
                  <Text>{l.name}</Text>
                  <Text
                    style={{
                      color: l.percent_change_24h.includes("-")
                        ? "red"
                        : "green"
                    }}
                    note
                  >
                    {l.price_usd}
                  </Text>
                </Body>
                <Right>
                  <View
                    style={{
                      borderRadius: 4,
                      borderWidth: 0.5,
                      padding: 8,
                      borderColor: l.percent_change_24h.includes("-")
                        ? "red"
                        : "green"
                    }}
                  >
                    <Text
                      note
                      style={{
                        color: l.percent_change_24h.includes("-")
                          ? "red"
                          : "green"
                      }}
                    >
                      {l.percent_change_24h.includes("-")
                        ? `${l.percent_change_24h}%`
                        : `+${l.percent_change_24h}%`}
                    </Text>
                  </View>
                </Right>
              </ListItem>
            ))}
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
