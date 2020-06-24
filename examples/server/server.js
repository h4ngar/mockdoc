import { MockController } from '../../src/server/MockController';
import { CategoriesController } from '../../src/server/CategoriesController';
import { Server, IndexController } from '@scripty/server';
import { Logger } from '@scripty/logger';
import { mongo } from '@scripty/mongo';

const init = async () => {
    Logger.info('server is initializing');

    const mongoConfig = {
        server: process.env.MONGO_SERVER,
        db: process.env.MONGO_DATABASE,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        port: process.env.MONGO_PORT || 27017,
        auth: process.env.MONGO_AUTH || true,
        options: {
            encrypt: true
        }
    }

    await mongo(mongoConfig);
    let app = new Server();
    const templateConfig = {
        title: 'mockdoc'
    };
    await app.addController(new CategoriesController());
    await app.addController(new MockController());
    await app.addController(new IndexController(templateConfig));
    app.start();
};

init().catch((err) => {
    console.error(err.message);
});
