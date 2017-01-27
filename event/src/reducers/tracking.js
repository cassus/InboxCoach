const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      console.log('START_TRACKING')

      return {
        tabId: action.tab.id,
        windowId: action.tab.windowId,
      };

    case 'STOP_TRACKING':

      console.log('STOP_TRACKING')

      return false;
    default:
      return state;
  }
};
