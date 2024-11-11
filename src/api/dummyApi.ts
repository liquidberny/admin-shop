import axios from 'axios';

const dummyApi = axios.create({
  baseURL: import.meta.env.VITE_DUMMY_API_URL,
});

export { dummyApi };
