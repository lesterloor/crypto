import axios from "axios";

const API = {
  getCoinData() {
    let url = "https://www.cryptocompare.com/api/data/coinlist/";
    return axios.get(url).then(res => res.data);
  }
};
module.exports = API;
