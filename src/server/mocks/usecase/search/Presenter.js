import { urlParamsToObject } from '../../../../helper';

export default class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present({ total, response, page, results }) {
        response[0]._doc.requestBody = urlParamsToObject(response[0]._doc.requestBody)
        this.response.send({
            entries: response,
            pagination: {
                total,
                page: page,
                results: results
            }
        });
    };
}
