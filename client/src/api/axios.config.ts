import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_NODE_API}${
    import.meta.env.VITE_NODE_API_PORT
  }}`,
  withCredentials: true,
});

export default instance;
