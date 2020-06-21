import { MockController } from '../../src/server/MockController';
import { CategoriesController } from '../../src/server/CategoriesController';
import { Server, IndexController } from '@scripty/server';
import { Logger } from '@scripty/logger';
import { mongo } from '@scripty/mongo';

const init = async () => {
    Logger.info('server is initializing');

    const mongoConfig = {
        server: process.env.SERVER,
        db: process.env.DB,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.PORT,
        options: {
            encrypt: true
        }
    }

    await mongo(mongoConfig);
    let app = new Server();
    const templateConfig = {
        title: 'mockdoc'
    };
    await app.addController(new IndexController(templateConfig));
    await app.addController(new CategoriesController());
    await app.addController(new MockController());
    app.start();
};

init().catch((err) => {
    console.error(err.message);
});
