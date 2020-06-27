import mongoose from 'mongoose';
import { CATEGORIES_READ } from '../Constants';
import { Logger } from '@scripty/logger';

export class CategoriesRepository {

    constructor(requestSchema) {
        delete mongoose.connection.models['categories'];
        let Schema = new mongoose.Schema(requestSchema, {timestamps: true});
        this.model = mongoose.model('categories', Schema);
    }

    async read(query, presenter) {
        try {
            const response = await this.model.find({})
            return presenter.present({ code: CATEGORIES_READ, response })
        } catch (e) {
            Logger.error(e)
        }
    };

    async update(query, presenter) {
        let { _id, list } = query;

        if (!_id) {
            _id = new mongoose.mongo.ObjectID()
        }

        let updated = await this.model.findOneAndUpdate(
            { _id },
            { list },
            { new: true, upsert: true }
        );

        presenter.setUpdated(updated);
        return await this.read({}, presenter);
    };
}
