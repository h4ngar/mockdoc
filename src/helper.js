export const encodeResponseByContentType = (contentType, response) => {
    switch (contentType) {
        case 'application/json':
            return JSON.parse(response);
        case 'text/plain':
            return response
    }
}

export const objectToUrlParams = (queryParams) => {
    return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
}

export const urlParamsToObject = (urlParams) => {
    return Object.fromEntries(new URLSearchParams(urlParams))
}

export const hasQueryParams = (req) => {
    return Object.keys(req.query).length !== 0
}

export const hasBodyParams = (req) => {
    return Object.keys(req.body).length !== 0
}
