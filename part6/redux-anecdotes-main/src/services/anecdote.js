import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  try {
    const response = await axios.get(BASE_URL);

    return response.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const create = async (anecdote) => {
  try {
    const response = await axios.post(BASE_URL, {
      content: anecdote,
      id: getId(),
      votes: 0,
    });
    return response.data;
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

const update = async (anecdote) => {
    try {
        const response = await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote);
        return response.data;
    } catch (error) {
        return {
            error: error.message,
        };
    }
}

export default { getAll, create, update };
