import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'categoriesStore',
    model: {
        list: [],
        _id: null
    },
    proxy: {
        rootProperty: 'entries',
        pagination: false,
        api: {
            update: {
                url: '/categories/update',
                method: 'post',
                responseProperty: 'entries'
            },
            read: {
                url: '/categories/read',
                method: 'get',
                responseProperty: 'entries'
            }
        }
    }
});
