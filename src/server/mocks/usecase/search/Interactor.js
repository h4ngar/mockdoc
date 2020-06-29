export default class Interactor {

    constructor(request, repository, presenter) {
        this.req = request;
        this.repository = repository;
        this.presenter = presenter;
    }

    async run() {
        const response = await this.repository.search(this.req.body);
        return this.presenter.present({ ...response })
    }
}
