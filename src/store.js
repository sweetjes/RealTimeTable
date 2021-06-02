import { createStore } from 'redux';
// import createSocketIoMiddleware from 'redux-socket.io';

import { devToolsEnhancer } from 'redux-devtools-extension';
import app from './reducers/reducers';

// const socket = io('http://localhost:8010', {
//   withCredentials: true,
//   extraHeaders: {
//     'my-custom-header': 'web',
//   },
// });

// const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
const state = createStore(app, devToolsEnhancer());

// state.subscribe(() => {});

export default state;
