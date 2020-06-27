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
        console.log(myResponse.responseContentType, ' myResponse.responseContentType ---------------------- ');
        const bla = encodeResponseByContentType(myResponse.responseContentType, myResponse.responseBody);
        console.log(bla, '  ---------------------- ');
        return this.response.json(bla);
    };
}
