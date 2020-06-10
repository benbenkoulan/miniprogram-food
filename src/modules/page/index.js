import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from '~/store'
import { Navigation } from '~/components/navigation'
import AuthorizeModal from '~/components/authorizeModal'
import routes from '../../router/routes'
import '~/styles/app.css'
import 'micro-design/es/micro.css';

export default (Page, { shouldShowCreate = true, navigationTitle = '' } = {}) => () => {
    const root = document.createElement('div');
    root.classList.push('.root--container');
    document.body.appendChild(root);

    const navigationContainer = document.createElement('header')
    navigationContainer.classList.push('.navigation--container')
    root.appendChild(navigationContainer)

    const container = document.createElement('div')
    container.classList.push('.app')
    root.appendChild(container)

    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const pageQuery = currentPage.query || {}

    const query = Object.keys(pageQuery).reduce((newQuery, key) => ({
        ...newQuery,
        [key]: decodeURIComponent(pageQuery[key])
    }), {})

    const navigationTitle = routes(currentPage.document.$_cookie.$_pageName)
        && routes(currentPage.document.$_cookie.$_pageName).title

    ReactDOM.render(
        (
            <Provider store={store}>
                <Navigation shouldShowCreate={shouldShowCreate} navigationTitle={navigationTitle}/>
            </Provider>
        ),
        navigationContainer
    )

    ReactDOM.render(
        <Provider store={store}>
            <Page query={query}/>
            <div className="modal--container"></div>
            <AuthorizeModal/>
        </Provider>, container)
}
