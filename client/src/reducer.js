export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: payload
      };
    case 'IS_LOGGED_IN':
      return {
        ...state,
        isAuthenticated: payload
      };
    case 'SIGNOUT_USER':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    case 'CREATE_DRAFT':
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        }
      };
    case 'DELETE_DRAFT':
      return {
        ...state,
        draft: null
      };
    case 'UPDATE_DRAFT_LOCATION':
      return {
        ...state,
        draft: payload
      };
    default:
      return state;
  }
}
