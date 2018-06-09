import { timeLimitStringToSeconds } from "../../common/common"

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

export function updateIcon({ store, timeUpAction, disableDispatch = false }) {
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
