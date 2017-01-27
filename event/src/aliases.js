const INITIATE_TRACKING = (orginalAction) => (dispatch) => {

  const query = {currentWindow: true, active: true}

  console.log('INITIATE_TRACKING')

  chrome.tabs.query(query, (tabs) => {

    console.log('tabs', tabs)

    if (tabs.length !== 1) {
      console.error('tabs.length !== 1', tabs.length)
    }

    dispatch({
      type: 'START_TRACKING',
      tab: tabs[0],
      now: new Date(),
    })
  })

  return {
    type: 'INITIATE_TRACKING',
  };
}

export default {
  INITIATE_TRACKING
}