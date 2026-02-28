import { describe, expect, it } from "vitest"
import { FREQUENCIES, RecurringTime } from "../src/js/recurringTime.js"

describe("RecurringTime", () => {
  describe("FREQUENCIES", () => {
    it("期待した値を持つ", () => {
      expect(FREQUENCIES.DAILY).toBe("daily")
      expect(FREQUENCIES.WEEKLY).toBe("weekly")
      expect(FREQUENCIES.MONTHLY).toBe("monthly")
    })
  })

  describe("constructor", () => {
    it("hours が数値でない場合は TypeError を投げる", () => {
      const birthDate = new Date(1990, 0, 1)

      expect(() => new RecurringTime("2", FREQUENCIES.DAILY, birthDate)).toThrow(TypeError)
      expect(() => new RecurringTime(Number.NaN, FREQUENCIES.DAILY, birthDate)).toThrow(TypeError)
    })

    it('frequency が "daily" | "weekly" | "monthly" 以外の場合は Error を投げる', () => {
      const birthDate = new Date(1990, 0, 1)

      expect(() => new RecurringTime(2, "yearly", birthDate)).toThrow(
        'frequency must be one of "daily" | "weekly" | "monthly"',
      )
    })

    it("birthDate が Date でない場合は Error を投げる", () => {
      expect(() => new RecurringTime(2, FREQUENCIES.DAILY, "2000-01-01")).toThrow("birthDate must be a Date")
    })
  })

  describe("getTotalWeeks", () => {
    it("hours が 0 以下の場合は 0 を返す", () => {
      const birthDate = new Date(1990, 0, 1)
      const recurringTimeZero = new RecurringTime(0, FREQUENCIES.DAILY, birthDate)
      const recurringTimeNegative = new RecurringTime(-1, FREQUENCIES.DAILY, birthDate)

      expect(recurringTimeZero.getTotalWeeks()).toBe(0)
      expect(recurringTimeNegative.getTotalWeeks()).toBe(0)
    })

    it("fromDate が toDate 以降の場合は 0 を返す", () => {
      const birthDate = new Date(2000, 0, 1)
      const recurringTime = new RecurringTime(1, FREQUENCIES.DAILY, birthDate)

      // 期間が逆転するように、fromDate を toDate より後ろに設定する
      recurringTime.fromDate = new Date(2100, 0, 1)

      expect(recurringTime.getTotalWeeks()).toBe(0)
    })

    it("DAILY の場合、期間内の日数分だけ回数をカウントして累計時間を週に換算する", () => {
      const birthDate = new Date(1990, 0, 1)
      const recurringTime = new RecurringTime(2, FREQUENCIES.DAILY, birthDate)

      // 2024-01-01 〜 2024-01-08 (7 日間)
      recurringTime.fromDate = new Date(2024, 0, 1)
      recurringTime.toDate = new Date(2024, 0, 8)

      const occurrences = 7
      const totalHours = occurrences * 2
      const expectedWeeks = totalHours / (7 * 24)

      expect(recurringTime.getTotalWeeks()).toBeCloseTo(expectedWeeks, 10)
    })

    it("WEEKLY の場合、期間内の週数分だけ回数をカウントして累計時間を週に換算する", () => {
      const birthDate = new Date(1990, 0, 1)
      const recurringTime = new RecurringTime(3, FREQUENCIES.WEEKLY, birthDate)

      // 2024-01-01 〜 2024-01-29 (4 週間分の発生を想定)
      recurringTime.fromDate = new Date(2024, 0, 1)
      recurringTime.toDate = new Date(2024, 0, 29)

      const occurrences = 4
      const totalHours = occurrences * 3
      const expectedWeeks = totalHours / (7 * 24)

      expect(recurringTime.getTotalWeeks()).toBeCloseTo(expectedWeeks, 10)
    })

    it("MONTHLY の場合、期間内の月数分だけ回数をカウントして累計時間を週に換算する", () => {
      const birthDate = new Date(1990, 0, 1)
      const recurringTime = new RecurringTime(10, FREQUENCIES.MONTHLY, birthDate)

      // 2024-01-01 〜 2024-04-01 (3 ヶ月分の発生を想定)
      recurringTime.fromDate = new Date(2024, 0, 1)
      recurringTime.toDate = new Date(2024, 3, 1)

      const occurrences = 3
      const totalHours = occurrences * 10
      const expectedWeeks = totalHours / (7 * 24)

      expect(recurringTime.getTotalWeeks()).toBeCloseTo(expectedWeeks, 10)
    })
  })
})
