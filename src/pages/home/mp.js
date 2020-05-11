import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import store from '../../store';
import withNavigation from '../../components/navigation';

import Index from './index';

import '../../styles/app.css';

const Home = withNavigation(Index);

export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>, container)
}

"undefined" != typeof wx && wx.getSystemInfoSync || createApp()
