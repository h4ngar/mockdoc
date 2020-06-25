import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'mockStore',
    model: {
        _id: null,
        status: 200,
        contentType: 'application/json',
        charset: 'UTF-8',
        headers: '',
        response: '',
        path: {
            path: '',
            isAutoGenerated: true
        }
    },
    proxy: {
        rootProperty: 'entries',
        pagination: false,
        api: {
            findOne: {
                url: '/mock',
                method: 'get',
                responseProperty: 'entries'
            },
            update: {
                url: '/update',
                method: 'post',
                responseProperty: 'entries'
            },
            read: {
                url: '/read',
                method: 'get',
                responseProperty: 'entries'
            },
            destroy: {
                url: '/destroy',
                method: 'post',
                responseProperty: 'entries'
            },
            search: {
                url: '/search',
                method: 'post',
                responseProperty: 'entries'
            }
        }
    }
});
