import * as config from "../constants/config";
import axios from "axios";

export default function callApi(endPoint, method = "get", data) {
  return axios({
    method: method,
    url: `${config.host}/${endPoint}`,
    data: data,
  }).catch((err) => {
    console.error("err: ", err);
  });
}
