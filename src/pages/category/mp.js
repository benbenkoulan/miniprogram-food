import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import withNavigation from '../../components/navigation';
import store from '../../store';

import Index from './index';

import '../../styles/app.css';

const Category = withNavigation(Index, { navigationTitle: '菜谱分类' });

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(
    <Provider store={store}>
        <Category />
    </Provider>, container)
}

"undefined" != typeof wx && wx.getSystemInfoSync || createApp()
