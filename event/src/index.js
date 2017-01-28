import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {wrapStore, alias} from 'react-chrome-redux'

import rootReducer from './reducers'
import aliases from './aliases';


const logger = store => next => action => {
  console.debug('dispatching', action.type, action)
  const result = next(action)
//  console.log('middleware result (orig)', result)
  console.debug('next state', store.getState())
  return result
}

const middlewares = [
  logger,
  alias(aliases),
  thunk,
];

const store = createStore(rootReducer, applyMiddleware(...middlewares))

wrapStore(store, {
  portName: 'port-6tbx4n2UxrcL'
})

function tabLoadedAction(tabId, changeInfo, tab) {
  const lastActiveItem = store.getState()['activeItem']
  const tracking = store.getState()['tracking']

  return {
    type: 'TAB_LOADED',
    tabId,
    changeInfo,
    tab,
    lastActiveItem,
    tracking,
    now: new Date()
  };
}

function timeUpAction() {
  const lastActiveItem = store.getState()['activeItem']

  const myAudio = new Audio()
  myAudio.src = "solemn.mp3"
  myAudio.play()

  return {
    type: 'TIME_UP',
    lastActiveItem,
    now: new Date()
  };
}


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // See https://developer.chrome.com/extensions/tabs#event-onUpdated

    if (changeInfo.status !== 'complete') {
      return
    }

    store.dispatch(tabLoadedAction(tabId, changeInfo, tab))
  }
)

chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
  // console.log("onActivated", {tabId, windowId})
  store.dispatch({
    type: 'TAB_ACTIVATED',
    tabId,
    windowId,
  })

})

store.subscribe(function updateIconOnStateChange() {
  const {tracking, currentTab} = store.getState();

  const path = (
    tracking &&
    currentTab.tabId === tracking.tabId &&
    currentTab.windowId === tracking.windowId
      ? 'purple.png'
      : 'grey.png'
  )

  chrome.browserAction.setIcon({path})
})

function updateBadge({disableDispatch = false} = {}) {
  const {activeItem, inboxItems, tracking, settings} = store.getState()
  const now = new Date()
  const {timeLimit} = settings

  if (!activeItem || !tracking) {
    chrome.browserAction.setBadgeText({text: ''})
    return
  }

  const {url, loadedAt} = activeItem

  if (!inboxItems[url]) {
    return
  }
  const secondsSpentBefore = inboxItems[url].secondsSpent
  const secondsSpentNow = Math.round((now.getTime() - loadedAt.getTime()) / 1000)
  const timeSpent = (secondsSpentBefore + secondsSpentNow);

  chrome.browserAction.setBadgeText({
    text: timeSpent.toString() + "s"
  })

  chrome.browserAction.setBadgeBackgroundColor({
    color: (timeSpent < (timeLimit * 0.8) // turn yellow for the last 20%
      ? 'green'
      : timeSpent < timeLimit
        ? [232, 201, 19, 255] // deep-yellow
        : 'red')
  })

  if (disableDispatch !== true && timeLimit <= timeSpent && timeSpent < (timeLimit + 1)) {
    store.dispatch(timeUpAction())
  }
}

setInterval(updateBadge, 1000)
store.subscribe(() => updateBadge({disableDispatch: true}))
