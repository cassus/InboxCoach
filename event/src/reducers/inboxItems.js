const initialState = {}
const inboxItemDefaultState = {title: 'UNKNOWN', secondsSpent: 0}

function initializeInboxItemOnFirstOccurrence(state, url, title) {
  if (!state[url]) {
    state = {
      ...state,
      [url]: {
        ...inboxItemDefaultState,
        title,
      },
    }
  }
  return state;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_TRACKING': {
      // Reset counters and initialize with first item on the active tab

      const {url, title} = action.tab

      state = initialState
      state = initializeInboxItemOnFirstOccurrence(state, url, title);

      return state;
    }

    case 'TAB_LOADED': {
      const {tabId, changeInfo, tab, now, tracking, lastActiveItem:blurredItemInfo} = action
      const {url, title} = tab

      console.log('TAB_LOADED', {url, title})

      state = initializeInboxItemOnFirstOccurrence(state, url, title);

      if (tracking && tracking.tabId === tab.id) {

        if (blurredItemInfo) {
          const blurredUrl = blurredItemInfo.url

          state = {
            ...state,
            [blurredUrl]: blurredInboxItem(state[blurredUrl], blurredItemInfo, now),
          }
        }

        console.log('state', state)
      } else {
        //console.log('ignored TAB_LOADED from non-tracked tab')
      }
      return state
    }
    default:
      return state
  }
}

function blurredInboxItem(state, blurredItemInfo, now) {
  const blurredWasLoadedAt = blurredItemInfo.loadedAt

  const secondsSpent = Math.round((now.getTime() - blurredWasLoadedAt.getTime()) / 1000)
  const prevInboxItem = state || inboxItemDefaultState

  return {
    ...prevInboxItem,
    secondsSpent: prevInboxItem.secondsSpent + secondsSpent,
  }
}
