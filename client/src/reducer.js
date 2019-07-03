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
        },
        currentPin: null
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
    case 'GET_PINS':
      return {
        ...state,
        pins: payload
      };
    case 'CREATE_PIN':
      const newPin = payload;
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin]
      };

    case 'SET_PIN':
      return {
        ...state,
        currentPin: payload,
        draft: null
      };

    case 'DELETE_PIN':
      const deletedPin = payload;
      const filteredPins = state.pins.filter(pin => pin._id !== deletedPin._id);
      return {
        ...state,
        pins: filteredPins,
        currentPin: null
      };
    case 'CREATE_COMMENT':
      const updateCurPin = payload;
      const updatedPins = state.pins.map(pin =>
        pin._id === updateCurPin ? updateCurPin : pin
      );
      return {
        ...state,
        pins: updatedPins,
        currentPin: updateCurPin
      };
    default:
      return state;
  }
}
