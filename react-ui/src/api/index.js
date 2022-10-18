import axios from 'axios';

const API = axios.create({ baseURL: 'http://blooming-savannah-73734.herokuapp.com' });


export const fetchWorkoutsBySearch = (searchQuery) => API.get(`/dashboard/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
