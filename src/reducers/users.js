const initialState = { user: null, users: [] };

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'CONNECT':
      let newState = { ...state };
      newState.user = action.payload.id;

      return { ...newState, user: newState.user };

    case 'CONNECT_USERS':
      console.log(action.payload);
      newState = { ...state };
      newState.users.push({ id: action.payload.id, x: action.payload.x, y: action.payload.y });

      return { ...newState, users: newState.users };
    /* eslint-disable */
    case 'GET_COORDINATES':
      newState = { ...state };

      newState.users.map((user) => {
        if (user.id === action.payload.id) {
          user.x = action.payload.x;
          user.y = action.payload.y;
        }

        return user;
      });

      /* eslint-enable */

      return { ...newState, users: [...newState.users] };
    default:
      return state;
  }
}
