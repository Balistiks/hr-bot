export const API_URL = process.env.NODE_ENV === 'development'
    ? proccess.env.URL + '/api/' :
    window.location.protocol + '//' + window.location.host + '/api/';

export const API_URL_PATH = (path) => API_URL + path;

export const token = process.env.SECRET_TOKEN;
