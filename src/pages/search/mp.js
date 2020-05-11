import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../../store';
import withNavigation from '../../components/navigation';

import '../../styles/app.css';

import Index from './index';

const Search = withNavigation(Index, { navigationTitle: '搜索菜谱' });

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(
    <Provider store={store}>
        <Search />
    </Provider>, container)
}

"undefined" != typeof wx && wx.getSystemInfoSync || createApp()
