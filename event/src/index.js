import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { wrapStore, alias } from "react-chrome-redux"

import rootReducer from "./reducers"
import aliases from "./aliases"
import { timeLimitStringToSeconds } from "../../common/common"

const logger = store => next => action => {
  console.debug("dispatching", action.type, action)
  const result = next(action)
  //  console.log('middleware result (orig)', result)

  console.debug("next state", store.getState())

  return result
}

const middlewares = [logger, alias(aliases), thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

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
  // console.log("onActivated", {tabId, windowId})
  store.dispatch({
    type: "TAB_ACTIVATED",
    tabId,
    windowId
  })
})

function resetIcon() {
  chrome.browserAction.setIcon({ path: "grey.png" })
}

const canvas = document.createElement("canvas")

function backgroundColor(timeSpent, timeLimitSeconds) {
  if (timeSpent < timeLimitSeconds * 0.8) {
    return "green"
  }
  if (timeSpent < timeLimitSeconds) {
    return "rgb(232, 201, 19)" // deep-yellow
  }
  if (timeSpent < timeLimitSeconds * 2) {
    return "red"
  }

  return "black"
}

function secondsToMinutesString(seconds) {
  const minutes = Math.floor(seconds / 60)

  return minutes.toFixed(0)
}

function updateActiveIcon(timeSpent, timeLimitSeconds) {
  const context = canvas.getContext("2d")
  const text = secondsToMinutesString(timeSpent)
  const bgColor = backgroundColor(timeSpent, timeLimitSeconds)

  const size = 32

  context.fillStyle = bgColor
  context.fillRect(0, 0, size - 1, size - 1)

  context.fillStyle = "white"
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.font = `${size - 2}px Arial`
  context.fillText(text, (size - 1) / 2, (size - 1) / 2)

  chrome.browserAction.setIcon({
    imageData: {
      [size]: context.getImageData(0, 0, size - 1, size - 1)
    }
  })
}

function updateIcon({ disableDispatch = false } = {}) {
  const { activeItem, inboxItems, tracking, settings } = store.getState()
  const now = new Date()
  const timeLimitSeconds = timeLimitStringToSeconds(settings.timeLimit)

  if (!activeItem || !tracking) {
    resetIcon()

    return
  }

  const { url, loadedAt } = activeItem

  if (!inboxItems[url]) {
    return
  }
  const secondsSpentBefore = inboxItems[url].secondsSpent
  const secondsSpentNow = Math.round(
    (now.getTime() - loadedAt.getTime()) / 1000
  )
  const timeSpent = secondsSpentBefore + secondsSpentNow

  updateActiveIcon(timeSpent, timeLimitSeconds)

  if (
    disableDispatch !== true &&
    timeLimitSeconds <= timeSpent &&
    timeSpent < timeLimitSeconds + 1
  ) {
    store.dispatch(timeUpAction())
  }
}

setInterval(updateIcon, 1000)
store.subscribe(() => updateIcon({ disableDispatch: true }))
