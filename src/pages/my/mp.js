import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../../store';
import withNavigation from '../../components/navigation';

import Index from './index';

import '../../styles/app.css';

const My = withNavigation(Index, { navigationTitle: '我的' });

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(
    <Provider store={store}>
        <My />
    </Provider>, container)
}

"undefined" != typeof wx && wx.getSystemInfoSync || createApp()
