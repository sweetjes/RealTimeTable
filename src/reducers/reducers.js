import { combineReducers } from 'redux';
import productTable from './productTable';
import users from './users';

const app = combineReducers({
  productTable,
  users,
});

export default app;
