export function timeLimitStringToMinutes(str) {
  //fix decimal separators
  str = String(str).replace(/,/g, ".")

  const match = str.match(/([0-9.]+) *\/ *([0-9.]+)/)
  if (match) {
    const [_, first, second] = match
    return Number(first) / Number(second)
  }

  return Number(str)
}

export function timeLimitStringToSeconds(str) {
  return timeLimitStringToMinutes(str) * 60
}
