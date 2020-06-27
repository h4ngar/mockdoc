export default class Interactor {

    constructor(request, repository, readRepository, presenter) {
        this.req = request;
        this.repository = repository;
        this.readRepository = readRepository;
        this.presenter = presenter;
    }

    async run() {
        const destroyed = await this.repository.destroy(this.req.body);
        const response = await this.readRepository.read({ current: 1, results: 10 });
        return await this.presenter.present({ ...response, destroyed })
    }
}
