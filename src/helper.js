export const encodeResponseByContentType = (contentType, response) => {
    switch (contentType) {
        case 'application/json':
            try {
                return JSON.parse(response)
            } catch (e) {
                return {error: 'could´t parse json. please check your data format'}
            }
        case 'text/plain':
            return response
        case 'text/html':
            return response
        case 'text/xml':
            return response
    }
}

export const objectToUrlParams = (queryParams) => {
    return Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
}

export const urlParamsToObject = (urlParams) => {
    return Object.fromEntries(new URLSearchParams(urlParams))
}

export const hasUrlParams = (req) => {
    return req.params !== undefined
}

export const hasQueryParams = (req) => {
    return Object.keys(req.query).length !== 0
}

export const hasBodyParams = (req) => {
    return Object.keys(req.body).length !== 0
}

export const hasBodyAndQueryAndUrlParams = (req) => {
    return hasBodyParams(req) && hasQueryParams(req) && hasUrlParams(req);
}

export const hasBodyAndQueryParams = (req) => {
    return hasBodyParams(req) && hasQueryParams(req);
}

export const hasQueryAndUrlParams = (req) => {
    return hasQueryParams(req) && hasQueryParams(req);
}

export const filterByHeaderData = (headers, result) => {

    let collectedHeaders = [];

    const response = result.map((rec) => {

        if (rec.requestHeaders) {
            let parseRequestHeaders = JSON.parse(rec.requestHeaders);
            Object.keys(headers).forEach((key) => {
                if (typeof parseRequestHeaders[key] !== 'undefined') {
                    if (parseRequestHeaders[key] === headers[key]) {
                        collectedHeaders.push({[key]: parseRequestHeaders[key]})
                    }
                }
            });

            if (collectedHeaders.length === Object.keys(parseRequestHeaders).length) {
                return rec;
            }

        } else {
            return rec;
        }
    })

    return response;
}

export const getCategoryOptions = (list) => {
    return list.map((item)=> {
        return {
            label: item,
            value: item
        }
    })
}

export const getMockServiceUrl = (_id) => {
    let MOCK_SERVICE_URL = `${window.location.protocol}//${window.location.hostname}/mock${_id}`;

    if (window.location.port) {
        MOCK_SERVICE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/mock/${_id}`;
    }

    return MOCK_SERVICE_URL;
}
