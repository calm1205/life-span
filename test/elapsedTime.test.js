import { describe, expect, it } from "vitest"
import { ElapsedTime } from "../src/js/elapsedTime.js"

describe("ElapsedTime", () => {
  describe("weeks (前回の誕生日から現在までの経過週数)", () => {
    it("誕生日当日の場合は 0 週を返す", () => {
      const birthDate = new Date(1990, 5, 15) // 6 月 15 日
      const today = new Date(2024, 5, 15, 12, 0, 0) // 同じ年月日（時間だけ違う）

      const elapsedTime = new ElapsedTime(birthDate, today)
      expect(elapsedTime.weeks).toBe(0)
    })

    it("今年の誕生日を過ぎている場合は weeksFromLastBirthday と同じ値を返す", () => {
      const birthDate = new Date(1990, 5, 1) // 6 月 1 日
      const today = new Date(2024, 5, 15, 9, 0, 0) // 6 月 15 日

      const elapsedTime = new ElapsedTime(birthDate, today)
      // 2024-06-01 から 2024-06-15 までは 2 週間
      expect(elapsedTime.weeks).toBe(2)
    })

    it("今年の誕生日がまだ来ていない場合は weeksFromLastBirthday と同じ値を返す", () => {
      const birthDate = new Date(1990, 5, 15) // 6 月 15 日
      const today = new Date(2024, 5, 1, 10, 0, 0) // 6 月 1 日

      const elapsedTime = new ElapsedTime(birthDate, today)
      // 前回の誕生日は 2023-06-15 なので、そこから 2024-06-01 までは 50 週間
      expect(elapsedTime.weeks).toBe(50)
    })

    it("返り値は常に 0 以上の整数である", () => {
      const birthDate = new Date(1990, 0, 1) // 1 月 1 日
      const today = new Date(1990, 0, 1, 23, 59, 59) // 同じ日だが時刻だけ遅い

      const elapsedTime = new ElapsedTime(birthDate, today)
      const result = elapsedTime.weeks

      expect(result).toBeGreaterThanOrEqual(0)
      expect(Number.isInteger(result)).toBe(true)
    })
  })

  describe("months (前回の誕生日から現在までの経過月数)", () => {
    it("誕生日当日の場合は 0 ヶ月を返す", () => {
      const birthDate = new Date(1990, 5, 15) // 6 月 15 日
      const today = new Date(2024, 5, 15, 12, 0, 0) // 同じ年月日（時間だけ違う）

      const elapsedTime = new ElapsedTime(birthDate, today)
      expect(elapsedTime.months).toBe(0)
    })

    it("今年の誕生日を過ぎている場合は、前回の誕生日からの完全に経過した月数を返す", () => {
      const birthDate = new Date(1990, 5, 15) // 6 月 15 日
      const today = new Date(2024, 8, 10) // 2024-09-10

      // 2024-06-15 -> 2024-09-10 のうち、完全に経過したのは 2 ヶ月（〜8/15 まで）
      const elapsedTime = new ElapsedTime(birthDate, today)
      expect(elapsedTime.months).toBe(2)
    })

    it("今年の誕生日がまだ来ていない場合は、前年の誕生日からの完全に経過した月数を返す", () => {
      const birthDate = new Date(1990, 5, 15) // 6 月 15 日
      const today = new Date(2024, 2, 1) // 2024-03-01

      // 前回の誕生日は 2023-06-15 なので、そこから 2024-03-01 までに完全に経過したのは 8 ヶ月
      const elapsedTime = new ElapsedTime(birthDate, today)
      expect(elapsedTime.months).toBe(8)
    })

    it("返り値は常に 0 以上 11 以下の整数である", () => {
      const birthDate = new Date(1990, 0, 31) // 1 月 31 日
      const today = new Date(1991, 0, 30) // 翌年 1 月 30 日（誕生日の前日）

      const elapsedTime = new ElapsedTime(birthDate, today)
      const result = elapsedTime.months

      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(11)
      expect(Number.isInteger(result)).toBe(true)
    })
  })
})
