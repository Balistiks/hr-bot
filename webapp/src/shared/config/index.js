export const API_URL = process.env.NODE_ENV === 'development'
    ? 'https://06a6-95-154-118-67.ngrok-free.app/api/' :
    window.location.protocol + '//' + window.location.host + '/api/';

export const API_URL_PATH = (path) => API_URL + path;

export const token = process.env.SECRET_TOKEN;
