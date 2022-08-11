import axios from "axios";

const baseUrl = "https://blgbackend.herokuapp.com/api/login/";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};



export default { login };
