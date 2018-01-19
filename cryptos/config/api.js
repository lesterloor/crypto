import axios from "axios";

const API = {
  getCoinData() {
    // let url = "https://api.coinmarketcap.com/v1/ticker/?limit=20";
    let url = "https://www.cryptocompare.com/api/data/coinlist/";
    return axios.get(url).then(res => res);
  }
  // getCoinDataMarketCap() {
  //   let url = "https://www.cryptocompare.com/api/data/coinlist/";
  //   axios.get(url).then(res => {
  //     const result = res.data.Data;
  //     // console.log(result);
  //     // console.log(Object.values(result));
  //     Object.values(result).map((l, i) => {
  //       // Object.keys(l).map((a, b) => {
  //       console.log(l.Id);
  //       // console.log(b);
  //       // });
  //     });
  //   });
  // }
};
module.exports = API;
