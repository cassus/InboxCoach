export function timeLimitStringToMinutes(str) {
  return Number(String(str).replace(/,/g, '.'))
}

export function timeLimitStringToSeconds(str) {
  return timeLimitStringToMinutes(str) * 60
}
