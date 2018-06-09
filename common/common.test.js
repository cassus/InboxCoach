import { timeLimitStringToMinutes } from "./common"

test("handles dot as decimal separator", () => {
  expect(timeLimitStringToMinutes("1.00")).toBe(1)
})

test("handles comma as decimal separator", () => {
  expect(timeLimitStringToMinutes("1,00")).toBe(1)
})
