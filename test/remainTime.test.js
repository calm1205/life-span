import { beforeEach, describe, expect, it, vi } from "vitest"
import * as getQueryDateModule from "../src/js/getQueryDate.js"
import { RemainTime } from "../src/js/remainTime.js"

vi.mock("../src/js/getQueryDate.js")

describe("RemainTime", () => {
  const EXPECTANCY_AGE = 90
  const DAYS_PER_YEAR = 365
  const HOURS_PER_YEAR = DAYS_PER_YEAR * 24
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("days は期待年数 * 365 から経過日数を引いた残り日数を返す", () => {
    const mockedGetQueryDate = vi.mocked(getQueryDateModule.getQueryDate)

    // テストしやすいように、生年月日と現在日時を固定する
    const birthDate = new Date(2000, 0, 1) // 2000/1/1
    const today = new Date(2025, 0, 1) // 2025/1/1

    mockedGetQueryDate.mockReturnValue(birthDate)

    vi.useFakeTimers()
    vi.setSystemTime(today)

    const remainTime = new RemainTime()

    const diffMs = Math.abs(today.getTime() - birthDate.getTime())
    const daysSinceBirth = Math.ceil(diffMs / MILLISECONDS_PER_DAY)
    const expectedDays = EXPECTANCY_AGE * DAYS_PER_YEAR - daysSinceBirth

    expect(remainTime.days).toBe(expectedDays)

    vi.useRealTimers()
  })

  it("hours は days に 1 年あたりの時間数 (365 * 24) を掛けた値を返す", () => {
    const mockedGetQueryDate = vi.mocked(getQueryDateModule.getQueryDate)

    const birthDate = new Date(1990, 0, 1) // 1990/1/1
    const today = new Date(2020, 0, 1) // 2020/1/1

    mockedGetQueryDate.mockReturnValue(birthDate)

    vi.useFakeTimers()
    vi.setSystemTime(today)

    const remainTime = new RemainTime()

    const diffMs = Math.abs(today.getTime() - birthDate.getTime())
    const daysSinceBirth = Math.ceil(diffMs / MILLISECONDS_PER_DAY)
    const expectedDays = EXPECTANCY_AGE * DAYS_PER_YEAR - daysSinceBirth
    const expectedHours = expectedDays * HOURS_PER_YEAR

    expect(remainTime.hours).toBe(expectedHours)

    vi.useRealTimers()
  })
})
