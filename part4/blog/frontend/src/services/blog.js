import axios from "axios";

const baseUrl = "https://blgbackend.herokuapp.com/api/blogs/";

const getAll = async (token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  try {
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const update = async (id, newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };

  try {
    const response = await axios.put(`${baseUrl + id}`, newObject, config);
    return response.data;
  } catch (error) {
    console.log(`update error: ${JSON.stringify(error)}`);
    return error.response.data;
  }
};

const remove = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  try {
    const response = await axios.delete(baseUrl + id, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { getAll, create, update, remove };
