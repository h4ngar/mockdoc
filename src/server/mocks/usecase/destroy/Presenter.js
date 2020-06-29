export default class Presenter {
    constructor(response) {
        this.response = response;
    }

    async present({ total, response, page, results, destroyed }) {
        this.response.send({
            destroyed: destroyed,
            entries: response,
            pagination: {
                total,
                page: page,
                results: results
            }
        });
    };
}
