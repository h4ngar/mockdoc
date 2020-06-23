export const getCategoryOptions = (list) => {
    return list.map((item)=> {
        return {
            label: item,
            value: item
        }
    })
}

export const getMockServiceUrl = (_id) => {
    let MOCK_SERVICE_URL = `${window.location.protocol}//${window.location.hostname}/mock/${_id}`;

    if (window.location.port) {
        MOCK_SERVICE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/mock/${_id}`;
    }

    return MOCK_SERVICE_URL;
}
