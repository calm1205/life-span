import { describe, expect, it, vi } from "vitest"
import { getAge } from "../src/js/getAge.js"

describe("getAge", () => {
  it("誕生日当日の年齢を正しく計算する", () => {
    const birthDate = new Date(1990, 5, 15) // 6 月 15 日
    const today = new Date(2024, 5, 15, 12, 0, 0) // 同じ年月日（時間だけ違う）

    const result = getAge(birthDate, today)

    expect(result).toBe(34)
  })

  it("今年の誕生日がまだ来ていない場合は 1 歳若く計算する（誕生月より前）", () => {
    const birthDate = new Date(1990, 9, 1) // 10 月 1 日
    const today = new Date(2024, 8, 30, 10, 0, 0) // 9 月 30 日

    const result = getAge(birthDate, today)

    expect(result).toBe(33)
  })

  it("今年の誕生日がまだ来ていない場合は 1 歳若く計算する（同じ月で日付が前）", () => {
    const birthDate = new Date(1990, 5, 15) // 6 月 15 日
    const today = new Date(2024, 5, 1, 0, 0, 0) // 6 月 1 日

    const result = getAge(birthDate, today)

    expect(result).toBe(33)
  })

  it("今年の誕生日を過ぎている場合は年の差をそのまま返す", () => {
    const birthDate = new Date(1990, 0, 1) // 1 月 1 日
    const today = new Date(2024, 5, 1, 0, 0, 0) // 6 月 1 日

    const result = getAge(birthDate, today)

    expect(result).toBe(34)
  })

  it("today 引数を省略した場合は現在日時を基準に計算する", () => {
    const fixedToday = new Date(2024, 0, 1, 12, 0, 0) // 2024/1/1

    vi.useFakeTimers()
    vi.setSystemTime(fixedToday)

    const birthDate = new Date(2000, 0, 1) // 2000/1/1

    const result = getAge(birthDate)

    expect(result).toBe(24)

    vi.useRealTimers()
  })
})
