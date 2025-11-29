import { describe, expect, it, vi } from "vitest"
import { daysSinceBirth } from "../src/js/daysSinceBirth.js"

describe("daysSinceBirth (誕生日からの経過日数)", () => {
  it("誕生日と同じ年月日の場合は 1 日を返す（当日を 1 日目として数える）", () => {
    const birthDate = new Date(2000, 0, 1, 0, 0, 0)
    const today = new Date(2000, 0, 1, 23, 59, 59)

    const result = daysSinceBirth(birthDate, today)

    expect(result).toBe(1)
  })

  it("ちょうど 1 日の差がある場合は 1 日を返す", () => {
    const birthDate = new Date(2000, 0, 1, 0, 0, 0)
    const today = new Date(2000, 0, 2, 0, 0, 0)

    const result = daysSinceBirth(birthDate, today)

    expect(result).toBe(1)
  })

  it("複数日の差がある場合はその日数を返す", () => {
    const birthDate = new Date(2000, 0, 1, 12, 0, 0)
    const today = new Date(2000, 0, 11, 11, 59, 59) // ほぼ 10 日だが、切り上げで 10 日

    const result = daysSinceBirth(birthDate, today)

    expect(result).toBe(10)
  })

  it("birthDate が today より未来でも絶対値で日数を返す", () => {
    const birthDate = new Date(2000, 0, 10, 0, 0, 0)
    const today = new Date(2000, 0, 1, 0, 0, 0)

    const result = daysSinceBirth(birthDate, today)

    expect(result).toBe(9)
  })

  it("today 引数を省略した場合は現在日時を基準に計算する", () => {
    const fixedToday = new Date(2024, 0, 11, 12, 0, 0) // 2024/1/11

    vi.useFakeTimers()
    vi.setSystemTime(fixedToday)

    const birthDate = new Date(2024, 0, 1, 0, 0, 0) // 2024/1/1

    const result = daysSinceBirth(birthDate)

    expect(result).toBe(11)

    vi.useRealTimers()
  })
})
