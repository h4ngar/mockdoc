import { encodeResponseByContentType } from '../../../../helper';

export default class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present({ response }) {
        const myResponse = response[0];
        if (myResponse.responseHeaders && myResponse.responseHeaders !== '') {
            const responseHeaders = myResponse.responseHeaders;
            this.response.headers = responseHeaders;
            Object.keys(responseHeaders).forEach((key) => {
                this.response.set({ [key]: responseHeaders[key] });
            });
        }

        this.response.set('Content-Type', `${myResponse.responseContentType};charset=${myResponse.responseCharset}`);
        this.response.status(myResponse.responseStatus);
        const result = encodeResponseByContentType(myResponse.responseContentType, myResponse.responseBody);
        return this.response.json(result);
    };

    presentError({ code, message }) {
        this.response.status(code).json({Error: message})
    }
}
