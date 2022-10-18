import axios from 'axios';

const API = axios.create({ baseURL: 'http://arcane-oasis-13539.herokuapp.com' });


export const fetchWorkoutsBySearch = (searchQuery) => API.get(`/dashboard/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
