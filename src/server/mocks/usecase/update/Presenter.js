export default class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present({ total, response, page, results, updated }) {
        this.response.send({
            updated: updated,
            entries: response,
            pagination: {
                total,
                page: page,
                results: results
            }
        });
    };
}
