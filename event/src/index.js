import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { wrapStore, alias } from "react-chrome-redux"

import rootReducer from "./reducers"
import aliases from "./aliases"
import { updateIcon } from "./icon"

const logger = store => next => action => {
  console.debug("dispatching", action.type, action)
  const result = next(action)

  console.debug("next state", store.getState())

  return result
}

const middlewares = [logger, alias(aliases), thunk]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

wrapStore(store, {
  portName: "port-6tbx4n2UxrcL"
})

function tabLoadedAction(tabId, changeInfo, tab) {
  const lastActiveItem = store.getState()["activeItem"]
  const tracking = store.getState()["tracking"]

  return {
    type: "TAB_LOADED",
    tabId,
    changeInfo,
    tab,
    lastActiveItem,
    tracking,
    now: new Date()
  }
}

function timeUpAction() {
  const lastActiveItem = store.getState()["activeItem"]

  const myAudio = new Audio()

  myAudio.src = "solemn.mp3"
  myAudio.play()

  return {
    type: "TIME_UP",
    lastActiveItem,
    now: new Date()
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // See https://developer.chrome.com/extensions/tabs#event-onUpdated

  if (changeInfo.status !== "complete") {
    return
  }

  store.dispatch(tabLoadedAction(tabId, changeInfo, tab))
})

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  store.dispatch({
    type: "TAB_ACTIVATED",
    tabId,
    windowId
  })
})

setInterval(() => updateIcon({ store, timeUpAction }), 1000)
store.subscribe(() =>
  updateIcon({ store, timeUpAction, disableDispatch: true })
)
