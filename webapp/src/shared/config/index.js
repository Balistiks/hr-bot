export const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://192.168.0.109:3000/api/' :
    window.location.protocol + '//' + window.location.host + '/api/';

export const API_URL_PATH = (path) => API_URL + path;

export const token = 'uwu';
