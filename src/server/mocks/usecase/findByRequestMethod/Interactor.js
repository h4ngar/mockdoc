import {
    filterByHeaderData,
    hasBodyAndQueryAndUrlParams,
    hasBodyParams,
    hasQueryAndUrlParams, hasQueryParams,
    objectToUrlParams,
} from '../../../../helper';

export default class Interactor {

    constructor(request, repository, presenter) {
        this.req = request;
        this.repository = repository;
        this.presenter = presenter;
    }

    async run() {

        //console.log(hasBodyAndQueryAndUrlParams(this.req), ' hasBodyAndQueryAndUrlParams(this.req) ---------------------- ');

        if (hasBodyAndQueryAndUrlParams(this.req)) {
            const path = this.req.params[0];
            const query = objectToUrlParams(this.req.query);
            const body = JSON.stringify(this.req.body);
            const headers = this.req.headers;
            const result = await this.repository.findPostAndUrlParams({ path, query, body });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }

        //console.log(hasQueryAndUrlParams(this.req), ' hasQueryAndUrlParams(this.req) ---------------------- ');

        if (hasQueryAndUrlParams(this.req)) {
            const path = this.req.params[0];
            const query = objectToUrlParams(this.req.query);
            const headers = this.req.headers;
            const result = await this.repository.findGetAndUrlParams({ path, query });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }

        //console.log(!hasQueryParams(this.req) && !hasBodyParams(this.req), ' !hasQueryParams(this.req) && !hasBodyParams(this.req) ---------------------- ');

        if (!hasQueryParams(this.req) && !hasBodyParams(this.req)) {
            const path = this.req.params[0];
            const headers = this.req.headers;
            const result = await this.repository.findGet({ path });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }

        //console.log(hasBodyParams(this.req), ' hasBodyParams(this.req) ---------------------- ');

        if (hasBodyParams(this.req)) {
            const path = this.req.params[0];
            const headers = this.req.headers;
            const body = JSON.stringify(this.req.body);
            const result = await this.repository.findPost({ path, body });
            const response = filterByHeaderData(headers, result);
            return this.presenter.present({response});
        }
    }
}
