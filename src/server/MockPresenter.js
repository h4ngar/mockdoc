import { MOCK_UPDATE, MOCK_READ, MOCK_FIND, MOCK_SEARCH } from './Constants';

export class MockPresenter {
    constructor(response) {
        this.response = response;
        this.updated = [];
    }

    async present({ response, total, code, page, results }) {

        switch (code) {
            case MOCK_FIND:
                this.response.headers = response._doc.headers;
                Object.keys(response._doc.headers).forEach((key) => {
                    this.response.set({ [key]: response._doc.headers[key] });
                });
                this.response.set('Content-Type', `${response._doc.contentType};charset=${response._doc.charset}`);
                this.response.status(response._doc.status);
                this.response.json(response._doc.response);
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
