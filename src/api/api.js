import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "ced15ba83f3ec26f1efe11a561f1a6cf",
  },
});

export const token = 'api_key=ced15ba83f3ec26f1efe11a561f1a6cf'