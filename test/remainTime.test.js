import { beforeEach, describe, expect, it, vi } from "vitest"
import * as daysSinceBirthModule from "../src/js/daysSinceBirth.js"
import * as getQueryDateModule from "../src/js/getQueryDate.js"
import { RemainTime } from "../src/js/remainTime.js"

vi.mock("../src/js/daysSinceBirth.js")
vi.mock("../src/js/getQueryDate.js")

describe("RemainTime", () => {
  const EXPECTANCY_AGE = 90
  const DAYS_PER_YEAR = 365
  const HOURS_PER_YEAR = DAYS_PER_YEAR * 24

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("days は期待年数 * 365 から経過日数を引いた残り日数を返す", () => {
    const mockedDaysSinceBirth = vi.mocked(daysSinceBirthModule.daysSinceBirth)
    const mockedGetQueryDate = vi.mocked(getQueryDateModule.getQueryDate)

    // constructor 内で呼ばれる getQueryDate の戻り値は計算には直接影響しないが、
    // 実際の振る舞いに近づけるために有効な Date を返す
    mockedGetQueryDate.mockReturnValue(new Date(2000, 0, 1))
    mockedDaysSinceBirth.mockReturnValue(1000)

    const remainTime = new RemainTime()

    const expectedDays = EXPECTANCY_AGE * DAYS_PER_YEAR - 1000
    expect(remainTime.days).toBe(expectedDays)
  })

  it("hours は days に 1 年あたりの時間数 (365 * 24) を掛けた値を返す", () => {
    const mockedDaysSinceBirth = vi.mocked(daysSinceBirthModule.daysSinceBirth)
    const mockedGetQueryDate = vi.mocked(getQueryDateModule.getQueryDate)

    mockedGetQueryDate.mockReturnValue(new Date(2000, 0, 1))
    mockedDaysSinceBirth.mockReturnValue(10)

    const remainTime = new RemainTime()

    const expectedDays = EXPECTANCY_AGE * DAYS_PER_YEAR - 10
    const expectedHours = expectedDays * HOURS_PER_YEAR

    expect(remainTime.hours).toBe(expectedHours)
  })
})
