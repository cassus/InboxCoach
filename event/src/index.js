import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {wrapStore, alias} from 'react-chrome-redux'

import rootReducer from './reducers'
import aliases from './aliases';


const middlewares = [
  alias(aliases),
  thunk
];

const store = createStore(rootReducer, applyMiddleware(...middlewares))

wrapStore(store, {
  portName: 'port-6tbx4n2UxrcL'
})

const TIME_LIMIT = 10

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

function updateBadge() {
  const {activeItem, inboxItems} = store.getState()
  const now = new Date()

  if (!activeItem) {
    return
  }
  const {url, loadedAt} = activeItem

  if (!inboxItems[url]) {
    return
  }
  const secondsSpentBefore = inboxItems[url].secondsSpent
  const secondsSpentNow = Math.round((now.getTime() - loadedAt.getTime()) / 1000)


  const timeSpent = (secondsSpentBefore + secondsSpentNow);
  let badgeText = (timeSpent).toString() + "s"
  chrome.browserAction.setBadgeText({text: badgeText})

  if (TIME_LIMIT <= timeSpent) {
    chrome.browserAction.setBadgeBackgroundColor({color: 'red'})
  } else {
    chrome.browserAction.setBadgeBackgroundColor({color: 'green'})
  }


  if (TIME_LIMIT <= timeSpent && timeSpent < TIME_LIMIT + 1) {
    store.dispatch(timeUpAction())
  }

}
setInterval(updateBadge, 1000)