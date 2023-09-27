import axios from 'axios';

const uri = import.meta.env.VITE_NODE_API_PORT
  ? `${import.meta.env.VITE_NODE_API}:${import.meta.env.VITE_NODE_API_PORT}`
  : `${import.meta.env.VITE_NODE_API}`;
console.log(uri);
const instance = axios.create({
  baseURL: uri,
  withCredentials: true,
});

export default instance;
