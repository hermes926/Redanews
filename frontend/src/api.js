import axios from "axios";

const instance = axios.create({
  baseURL: `https://redanews.df.r.appspot.com/`,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));
