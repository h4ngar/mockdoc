export const getCategoryOptions = (list) => {
    return list.map((item)=> {
        return {
            label: item,
            value: item
        }
    })
}

export const getMockServiceUrl = () => {
    let MOCK_SERVICE_URL = `${window.location.protocol}//${window.location.hostname}/mock/`;

    if (window.location.port) {
        MOCK_SERVICE_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/mock/`;
    }

    return MOCK_SERVICE_URL;
}
