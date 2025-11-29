import { describe, expect, it } from "vitest"
import { weeksFromLastBirthday } from "../src/js/weeksFromLastBirthday.js"

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

describe("weeksUntilNextBirthday (直近の誕生日から現在までの経過週数)", () => {
  it("誕生日当日の場合は 0 週を返す", () => {
    const birthDate = new Date(1990, 5, 15) // 6 月 15 日
    const today = new Date(2024, 5, 15, 12, 0, 0) // 同じ年月日（時間だけ違う）

    const result = weeksFromLastBirthday(birthDate, today)

    expect(result).toBe(0)
  })

  it("今年の誕生日を過ぎている場合は、今年の誕生日からの経過週数を返す", () => {
    const birthDate = new Date(1990, 5, 1) // 6 月 1 日
    const today = new Date(2024, 5, 15, 9, 0, 0) // 6 月 15 日

    const result = weeksFromLastBirthday(birthDate, today)

    const thisYear = today.getFullYear()
    const lastBirthday = new Date(
      thisYear,
      birthDate.getMonth(),
      birthDate.getDate(),
    )
    const todayMidnight = new Date(thisYear, today.getMonth(), today.getDate())

    const diffTime = todayMidnight.getTime() - lastBirthday.getTime()
    const expectedWeeks = Math.floor(diffTime / MS_PER_WEEK)

    expect(result).toBe(expectedWeeks)
  })

  it("今年の誕生日がまだ来ていない場合は、前年の誕生日からの経過週数を返す", () => {
    const birthDate = new Date(1990, 5, 15) // 6 月 15 日
    const today = new Date(2024, 5, 1, 10, 0, 0) // 6 月 1 日

    const result = weeksFromLastBirthday(birthDate, today)

    const thisYear = today.getFullYear()
    const lastBirthday = new Date(
      thisYear - 1,
      birthDate.getMonth(),
      birthDate.getDate(),
    )
    const todayMidnight = new Date(thisYear, today.getMonth(), today.getDate())

    const diffTime = todayMidnight.getTime() - lastBirthday.getTime()
    const expectedWeeks = Math.floor(diffTime / MS_PER_WEEK)

    expect(result).toBe(expectedWeeks)
  })

  it("まだ 1 回目の誕生日を迎えていない場合は、生まれた日からの経過週数を返す", () => {
    const birthDate = new Date(2024, 5, 15) // 2024/6/15
    const today = new Date(2024, 5, 20, 8, 0, 0) // 2024/6/20

    const result = weeksFromLastBirthday(birthDate, today)

    const birthMidnight = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    )
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )

    const diffTime = todayMidnight.getTime() - birthMidnight.getTime()
    const expectedWeeks = Math.floor(diffTime / MS_PER_WEEK)

    expect(result).toBe(expectedWeeks)
  })

  it("返り値は常に 0 以上の整数である", () => {
    const birthDate = new Date(1990, 0, 1) // 1 月 1 日
    const today = new Date(1990, 0, 1, 23, 59, 59) // 同じ日だが時刻だけ遅い

    const result = weeksFromLastBirthday(birthDate, today)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(Number.isInteger(result)).toBe(true)
  })
})
