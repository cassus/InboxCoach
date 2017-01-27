const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING': {
      const {now} = action
      const {url, title} = action.tab

      state = {
        loadedAt: now,
        url
      }
      return state
    }

    case 'STOP_TRACKING':
      return initialState

    case 'TAB_LOADED':
      let {tabId, changeInfo, tracking, tab, now} = action

      if (tracking && tracking.tabId === tab.id) {
        // only care about URL changes from the tracked tab
        let {url, title} = tab

        state = {
          loadedAt: now,
          url
        }
      }

      return state;
    default:
      return state;
  }
};
