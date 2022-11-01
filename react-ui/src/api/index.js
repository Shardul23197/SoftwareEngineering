import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchUsersBySearch = (searchQuery) => API.get(`/dashboard/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
