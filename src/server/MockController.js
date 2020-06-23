import { MockRepository } from './MockRepository';
import { MockPresenter } from './MockPresenter';
import { MockSchema } from './MockSchema';

export class MockController {

    init(server, router) {
        console.log('MockController')
        router.post('/search', this.searchMockAction);
        router.get('/read', this.readMockAction);
        router.post('/update', this.updateMockAction);
        router.post('/destroy', this.destroyMockAction);
        router.get('/mock/:_id', this.findMockAction);
        server.use(router);
    }

    findMockAction(req, res) {
        const presenter = new MockPresenter(res);
        const repository = new MockRepository(MockSchema);
        return repository.findMock(req.params, presenter)
    }

    searchMockAction(req, res) {
        const presenter = new MockPresenter(res);
        const repository = new MockRepository(MockSchema);
        return repository.searchMock(req.body, presenter)
    }

    readMockAction(req, res) {
        console.log('readMockAction')
        const presenter = new MockPresenter(res);
        const repository = new MockRepository(MockSchema);
        return repository.readMock(req.query, presenter)
    }

    updateMockAction(req, res) {
        const presenter = new MockPresenter(res);
        const repository = new MockRepository(MockSchema);
        return repository.updateMock(req.body, presenter)
    }

    destroyMockAction(req, res) {
        const presenter = new MockPresenter(res);
        const repository = new MockRepository(MockSchema);
        return repository.destroyMock(req.body, presenter)
    }
}
