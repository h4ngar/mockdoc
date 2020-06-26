import { MOCK_UPDATE, MOCK_READ, MOCK_FIND, MOCK_SEARCH } from './Constants';
import { urlParamsToObject } from '../helper';

export class MockPresenter {
    constructor(response) {
        this.response = response;
        this.updated = [];
    }

    async present({ response, total, code, page, results }) {

        switch (code) {
            case MOCK_FIND:
                this.response.headers = response.headers;
                Object.keys(response.headers).forEach((key) => {
                    this.response.set({ [key]: response.headers[key] });
                });
                this.response.set('Content-Type', `${response._doc.contentType};charset=${response.charset}`);
                this.response.status(response.status);
                this.response.json(response.response);
                break;

            case MOCK_UPDATE:
                this.response.send({
                    entries: [response._doc]
                });
            break;

            case MOCK_READ:
                this.response.send({
                    updated: this.updated,
                    entries: response,
                    pagination: {
                        total,
                        page: page,
                        results: results
                    }
                });
                break;

            case MOCK_SEARCH:
                response[0]._doc.requestBody = urlParamsToObject(response[0]._doc.requestBody)
                this.response.send({
                    entries: response,
                    pagination: {
                        total,
                        page: 1,
                        results: results
                    }
                });
                break;
        }
    };

    setUpdated(updated) {
        this.updated = updated;
    };
}
