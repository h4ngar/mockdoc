export default class Interactor {

    constructor(request, repository, presenter) {
        this.req = request;
        this.repository = repository;
        this.presenter = presenter;
    }

    async run() {
        const response = await this.repository.read(this.req.query);
        return await this.presenter.present({ ...response });
    }
}
