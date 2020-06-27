import { Schema } from './Schema';
import FindByRequestMethodRepository from './usecase/findByRequestMethod/Repository';
import FindByRequestMethodPresenter from './usecase/findByRequestMethod/Presenter';
import FindByRequestMethodInteractor from './usecase/findByRequestMethod/Interactor';
import SearchPresenter from './usecase/search/Presenter';
import SearchRepository from './usecase/search/Repository';
import SearchInteractor from './usecase/search/Interactor';
import ReadPresenter from './usecase/read/Presenter';
import ReadRepository from './usecase/read/Repository';
import ReadInteractor from './usecase/read/Interactor';
import UpdatePresenter from './usecase/update/Presenter';
import UpdateRepository from './usecase/update/Repository';
import UpdateInteractor from './usecase/update/Interactor';
import DestroyPresenter from './usecase/destroy/Presenter';
import DestroyRepository from './usecase/destroy/Repository';
import DestroyInteractor from './usecase/destroy/Interactor';

export default class Controller {

    init(server, router) {
        router.post('/search', this.searchAction);
        router.get('/read', this.readAction);
        router.post('/update', this.updateAction);
        router.post('/destroy', this.destroyAction);
        router.get('/mock/*', this.findByRequestMethodAction);
        router.post('/mock/*', this.findByRequestMethodAction);
        server.use(router);
    }

    findByRequestMethodAction(req, res) {
        const repository = new FindByRequestMethodRepository(Schema);
        const presenter = new FindByRequestMethodPresenter(res);
        const interactor = new FindByRequestMethodInteractor(req, repository, presenter);
        return interactor.run();
    }

    searchAction(req, res) {
        const presenter = new SearchPresenter(res);
        const repository = new SearchRepository(Schema);
        const interactor = new SearchInteractor(req, repository, presenter);
        return interactor.run()
    }

    readAction(req, res) {
        const presenter = new ReadPresenter(res);
        const repository = new ReadRepository(Schema);
        const interactor = new ReadInteractor(req, repository, presenter);
        return interactor.run()
    }

    updateAction(req, res) {
        const presenter = new UpdatePresenter(res);
        const repository = new UpdateRepository(Schema);
        const readRepository = new ReadRepository(Schema);
        const interactor = new UpdateInteractor(req, repository, readRepository, presenter);
        return interactor.run()
    }

    destroyAction(req, res) {
        const presenter = new DestroyPresenter(res);
        const repository = new DestroyRepository(Schema);
        const readRepository = new ReadRepository(Schema);
        const interactor = new DestroyInteractor(req, repository, readRepository, presenter);
        return interactor.run()
    }
}
