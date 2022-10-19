import axios from 'axios';

const API = axios.create({ baseURL: 'htttp://fitocity.herokuapp.com' });


export const fetchWorkoutsBySearch = (searchQuery) => API.get(`/dashboard/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
