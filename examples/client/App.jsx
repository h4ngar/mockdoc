import React from 'react';
import '@react-hangar/antd-components/dist/antd.css';
import '@react-hangar/antd-components/dist/antd-components.css';
import { hot } from 'react-hot-loader/root';
import { Header, Logo, ThemeProvider } from '@react-hangar/antd-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from '@scripty/react-store';
import mockStore from '../../src/client/store';
import categoriesStore from '../../src/client/categoriesStore';
import { Route, Switch } from 'react-router';
import { Categories } from '../../src/client/Categories';
import { NewMock } from '../../src/client/NewMock';
import { EditMock } from '../../src/client/EditMock';

const routes = [
    {
        key: 'design',
        label: 'Design Mock',
        icon: 'plus',
        exact: true,
        path: '/',
    },
    {
        key: 'edit',
        label: 'Edit Mocks',
        icon: 'edit',
        path: '/edit',
    },
    {
        key: 'categories',
        label: 'Categories',
        icon: 'dashboard',
        path: '/categories',
    }
];

let defaultStores = {
    mockStore,
    categoriesStore
};

const App = () => {
    return (
        <StoreProvider defaultStores={defaultStores}>
            <ThemeProvider theme={'light'}>
                <Router>
                    <Header
                        menuRoutes={routes}
                        style={{marginBottom: 20}}
                        headerBreakpoints={{xs:{span: 24, offset: 0}, xl:{ span: 18, offset: 3}}}
                        menuBreakpoints={{xs: 0, md: 0, xl:15, xxl:15}}
                        extraBreakpoints={{xs: 0, md: 0, xl:0, xxl:5}}
                        logo={<Logo to={'/'} image={'/files/logo-light.png'} version={'v1.1.0'}>MockDoc</Logo>}
                    />
                    <Route exact path={'/'} component={NewMock}/>
                    <Route path={'/mock-edit/*'}><NewMock/></Route>
                    <Route exact path={'/edit'} component={EditMock}/>
                    <Route path={'/categories'} component={Categories}/>

                </Router>
            </ThemeProvider>
        </StoreProvider>
    );
};

export default hot(App);
