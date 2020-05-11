import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../../store';
import withNavigation from '../../components/navigation';

import Index from './index';
import '../../styles/app.css';

const Create = withNavigation(Index, { showCreate: false, navigationTitle: '创建菜谱' });

export default function createApp() {
  const container = document.createElement('div')
  container.setAttribute('id', 'app');
  document.body.appendChild(container);

  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modalRoot');
  document.body.appendChild(modalRoot);

  ReactDOM.render(
    <Provider store={store}>
        <Create />
    </Provider>, container)
}

"undefined" != typeof wx && wx.getSystemInfoSync || createApp()
