import axios from 'axios';

const API = axios.create({ baseURL: 'https://fitocity-scheduling-frontend.herokuapp.com' });


export const fetchWorkoutsBySearch = (searchQuery) => API.get(`/dashboard/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
