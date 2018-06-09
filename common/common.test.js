import { timeLimitStringToMinutes } from "./common"

test("dot as decimal separator", () => {
  expect(timeLimitStringToMinutes("1.00")).toBe(1)
})

test("comma as decimal separator", () => {
  expect(timeLimitStringToMinutes("1,00")).toBe(1)
})

test("division", () => {
  expect(timeLimitStringToMinutes("20/10")).toBe(2)
})

test("division with whitespace", () => {
  expect(timeLimitStringToMinutes("20 / 10")).toBe(2)
})

test("returns error value when not able to calculate", () => {
  expect(timeLimitStringToMinutes("20/", "ERR")).toBe(NaN)
})
