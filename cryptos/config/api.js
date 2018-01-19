import axios from "axios";

const API = {
  getCoinData() {
    let url = "https://api.coinmarketcap.com/v1/ticker/?limit=20";
    return axios.get(url).then(res => res.data.Data);
  }
  // getCoinDataMarketCap() {
  //   let url = "https://www.cryptocompare.com/api/data/coinlist/";
  //   axios.get(url).then(res => {
  //     console.log(res);
  //   });
  // }
};
module.exports = API;
