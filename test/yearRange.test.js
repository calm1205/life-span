import { describe, expect, it, vi } from "vitest"
import { yearRange } from "../src/js/yearRange.js"

describe("yearRange (年の範囲配列)", () => {
  it("デフォルト引数で現在の年から 100 年分の配列を返す", () => {
    const fixedNow = new Date(2024, 0, 1, 0, 0, 0)

    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)

    const result = yearRange()

    expect(result).toHaveLength(100)
    expect(result[0]).toBe(2024)
    expect(result[99]).toBe(2024 - 99)

    vi.useRealTimers()
  })

  it("rangeSize を指定した場合、その数だけ現在の年から降順の年を返す", () => {
    const fixedNow = new Date(2030, 6, 1, 12, 0, 0)

    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)

    const result = yearRange(5)

    expect(result).toEqual([2030, 2029, 2028, 2027, 2026])

    vi.useRealTimers()
  })

  it("rangeSize が 0 の場合は空配列を返す", () => {
    const fixedNow = new Date(2000, 0, 1, 0, 0, 0)

    vi.useFakeTimers()
    vi.setSystemTime(fixedNow)

    const result = yearRange(0)

    expect(result).toEqual([])

    vi.useRealTimers()
  })
})
