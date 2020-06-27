import mongoose from 'mongoose';

export class BaseRepository {
    constructor(collection = '', schema = {}) {
        delete mongoose.connection.models[collection];
        const mongoSchema = new mongoose.Schema(schema, { timestamps: true });
        this.model = mongoose.model(collection, mongoSchema);
    }
}
