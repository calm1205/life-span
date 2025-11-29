import { describe, expect, it } from "vitest"
import { monthsFromLastBirthday } from "../src/js/monthsFromLastBirthday.js"

describe("monthsFromLastBirthday (直近の誕生日から現在までの経過月数)", () => {
  it("誕生日当日の場合は 0 ヶ月を返す", () => {
    const birthDate = new Date(1990, 5, 15) // 6 月 15 日
    const today = new Date(2024, 5, 15, 12, 0, 0) // 同じ年月日（時間だけ違う）

    const result = monthsFromLastBirthday(birthDate, today)

    expect(result).toBe(0)
  })

  it("今年の誕生日を過ぎている場合は、今年の誕生日からの経過月数を返す", () => {
    const birthDate = new Date(1990, 2, 10) // 3 月 10 日
    const today = new Date(2024, 5, 9, 9, 0, 0) // 6 月 9 日（3 月 10 日からほぼ 3 ヶ月だが記念日前）

    const result = monthsFromLastBirthday(birthDate, today)

    const thisYear = today.getFullYear()
    const lastBirthday = new Date(
      thisYear,
      birthDate.getMonth(),
      birthDate.getDate(),
    )
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )

    let expectedMonths =
      (todayDate.getFullYear() - lastBirthday.getFullYear()) * 12 +
      (todayDate.getMonth() - lastBirthday.getMonth())

    if (todayDate.getDate() < lastBirthday.getDate()) {
      expectedMonths -= 1
    }

    expect(result).toBe(expectedMonths)
  })

  it("今年の誕生日がまだ来ていない場合は、前年の誕生日からの経過月数を返す", () => {
    const birthDate = new Date(1990, 5, 15) // 6 月 15 日
    const today = new Date(2024, 4, 20, 10, 0, 0) // 2024/5/20（今年の 6/15 まだ）

    const result = monthsFromLastBirthday(birthDate, today)

    const thisYear = today.getFullYear()
    const lastBirthday = new Date(
      thisYear - 1,
      birthDate.getMonth(),
      birthDate.getDate(),
    )
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )

    let expectedMonths =
      (todayDate.getFullYear() - lastBirthday.getFullYear()) * 12 +
      (todayDate.getMonth() - lastBirthday.getMonth())

    if (todayDate.getDate() < lastBirthday.getDate()) {
      expectedMonths -= 1
    }

    expect(result).toBe(expectedMonths)
  })

  it("まだ 1 回目の誕生日を迎えていない場合は、生まれた日からの経過月数を返す", () => {
    const birthDate = new Date(2024, 0, 31) // 2024/1/31
    const today = new Date(2024, 1, 1, 8, 0, 0) // 2024/2/1（1 ヶ月記念日には達していない）

    const result = monthsFromLastBirthday(birthDate, today)

    const birthMidnight = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    )
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    )

    let expectedMonths =
      (todayDate.getFullYear() - birthMidnight.getFullYear()) * 12 +
      (todayDate.getMonth() - birthMidnight.getMonth())

    if (todayDate.getDate() < birthMidnight.getDate()) {
      expectedMonths -= 1
    }

    expect(result).toBe(expectedMonths)
  })

  it("返り値は常に 0 以上の整数である", () => {
    const birthDate = new Date(1990, 0, 1) // 1 月 1 日
    const today = new Date(1990, 0, 1, 23, 59, 59) // 同じ日だが時刻だけ遅い

    const result = monthsFromLastBirthday(birthDate, today)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(Number.isInteger(result)).toBe(true)
  })
})
