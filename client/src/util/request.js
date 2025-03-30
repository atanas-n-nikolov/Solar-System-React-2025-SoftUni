const request = async (method, url, data = null, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };


    const body = data ? JSON.stringify(data) : null;

    try {
        const response = await fetch(url, {
            method,
            headers,
            body,
            ...options,
        });

        if (!response || !response.headers) {
            console.error('Invalid response received', response);
            return null;
        }

        if (!response.ok) {  
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseContentType = response.headers.get('Content-Type');
        if (responseContentType && responseContentType.includes('application/json')) {
            return await response.json();
        }

        return null;
    } catch (error) {
        console.error('Request failed:', error);
        return null;
    }
};

export default {
    get: (url, options) => request('GET', url, null, options),
    post: (url, data, options) => request('POST', url, data, options),
    put: (url, data, options) => request('PUT', url, data, options),
    delete: (url, options) => request('DELETE', url, null, options),
    baseRequest: request,
};
