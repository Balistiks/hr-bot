export const API_URL = process.env.NODE_ENV === 'development'
    ? 'https://cir-barber.ru' + '/api/' :
    window.location.protocol + '//' + window.location.host + '/api/';

export const API_URL_PATH = (path) => API_URL + path;

export const token = 'beberguye'
