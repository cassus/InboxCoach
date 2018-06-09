const INITIATE_TRACKING = originalAction => dispatch => {
  const { timeLimit } = originalAction

  const query = { currentWindow: true, active: true }
  chrome.tabs.query(query, tabs => {
    if (tabs.length !== 1) {
      console.error("tabs.length !== 1", tabs.length)
    }

    dispatch({
      type: "START_TRACKING",
      timeLimit,
      tab: tabs[0],
      now: new Date()
    })
  })
}

export default {
  INITIATE_TRACKING
}
