export default class Interactor {

    constructor(request, repository, presenter) {
        this.req = request;
        this.repository = repository;
        this.presenter = presenter;
    }

    async run() {
        const response = await this.repository.read({ current: 1, results: 10 });
        return await this.presenter.present({ ...response });
    }
}
