import { CategoriesSchema } from './CategoriesSchema';
import { CategoriesRepository } from './CategoriesRepository';
import { CategoriesPresenter } from './CategoriesPresenter';

export class CategoriesController {

    init(server, router) {
        console.log('MockController')
        router.get('/categories/read', this.readAction);
        router.post('/categories/update', this.updateAction);
        server.use(router);
    }

    readAction(req, res) {
        console.log('readAction')
        const presenter = new CategoriesPresenter(res);
        const repository = new CategoriesRepository(CategoriesSchema);
        return repository.read(req.query, presenter)
    }

    updateAction(req, res) {
        const presenter = new CategoriesPresenter(res);
        const repository = new CategoriesRepository(CategoriesSchema);
        return repository.update(req.body, presenter)
    }
}
