const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING':
      return {
        tabId: action.tab.id,
        windowId: action.tab.windowId,
      };

    case 'TAB_ACTIVATED':
      return {
        tabId: action.tabId,
        windowId: action.windowId,
      };

    default:
      return state;
  }
};
