import Axios from "axios";

const instance = Axios.create({
  baseURL: 'https://react-my-burger-9a4c1.firebaseio.com/'
})

export default instance