import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../../store';

import AuthorizeModal from '../../components/authorizeModal';

import '../../styles/app.css';

export default (Page) => () => {
    const container = document.createElement('div')
    container.setAttribute('id', 'app');
    document.body.appendChild(container);

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modalRoot');
    document.body.appendChild(modalRoot);

    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const query = currentPage.query || {}; 

    console.log(query);

    ReactDOM.render(
        <Provider store={store}>
            <Page {...query} />
            <AuthorizeModal />
        </Provider>, container)
}
