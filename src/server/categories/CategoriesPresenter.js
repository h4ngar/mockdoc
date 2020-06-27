import { CATEGORIES_READ } from '../Constants';

export class CategoriesPresenter {
    constructor(response) {
        this.response = response;
        this.updated = [];
    }

    async present({ response, code }) {
        switch (code) {
            case CATEGORIES_READ:
                this.response.send({
                    updated: this.updated,
                    entries: response
                });
            break;
        }
    };

    setUpdated(updated) {
        this.updated = updated;
    };
}
