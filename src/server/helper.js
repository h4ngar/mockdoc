export const encodeResponseByContentType = (contentType, response) => {
    switch (contentType) {
        case 'application/json':
            return JSON.parse(response);
        case 'text/plain':
            return response
    }
}

export const getQueryParamsString = (queryParams) => {
    let params = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
    return `?${params}`;
}

export const hasQueryParams = (req) => {
    return Object.keys(req.query).length !== 0
}
