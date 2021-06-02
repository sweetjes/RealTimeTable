export const connectUser = (id) => ({
  type: 'CONNECT',
  payload: id,
});

export const connectUsers = (payload) => ({
  type: 'CONNECT_USERS',
  payload,
});
