import { useState } from 'react';
import { API_URL_PATH, token } from "@shared/config/index.js";

export const useApi = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url, method, requestData = null, form = false) => {
        setLoading(true);
        try {
            let response;
            const requestOptions = {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: requestData
            };

            if (!form) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = requestData ? JSON.stringify(requestData) : null;
            }

            response = await fetch(API_URL_PATH(url), requestOptions);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setData(responseData);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};
