export const FREQUENCIES = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
}

/**
 * 繰り返し発生する行為（睡眠・仕事など）の累計時間を計算するクラス
 */
export class RecurringTime {
  #MAX_AGE = 90
  #HOURS_PER_WEEK = 7 * 24

  /**
   * @param {number} hours - 1回あたりの時間（時間単位）
   * @param {"daily" | "weekly" | "monthly"} frequency - 繰り返し頻度
   */
  constructor(hours, frequency = FREQUENCIES.DAILY, birthDate) {
    if (typeof hours !== "number" || Number.isNaN(hours)) throw new TypeError("hours must be a valid number")
    if (!Object.values(FREQUENCIES).includes(frequency))
      throw new Error('frequency must be one of "daily" | "weekly" | "monthly"')
    if (!(birthDate instanceof Date)) throw new Error("birthDate must be a Date")

    this.hours = hours
    this.frequency = frequency
    this.fromDate = new Date()
    const endDate = new Date(birthDate.getFullYear() + this.#MAX_AGE, birthDate.getMonth(), birthDate.getDate())
    this.toDate = endDate
  }

  getTotalWeeks() {
    return this.#getTotalHours() / this.#HOURS_PER_WEEK
  }

  /**
   * 指定された期間内に発生する累計時間を返す
   */
  #getTotalHours() {
    if (this.hours <= 0) return 0

    // 期間が逆転している場合は 0
    if (this.fromDate.getTime() >= this.toDate.getTime()) return 0

    const occurrences = this.#countOccurrences()
    return occurrences * this.hours
  }

  /**
   * 指定期間内に何回発生するかをカウント
   */
  #countOccurrences() {
    let count = 0
    const current = new Date(this.fromDate.getTime())

    while (current < this.toDate) {
      count += 1

      switch (this.frequency) {
        case FREQUENCIES.DAILY:
          this.#addDays(current, 1)
          break
        case FREQUENCIES.WEEKLY:
          this.#addDays(current, 7)
          break
        case FREQUENCIES.MONTHLY:
          this.#addMonths(current, 1)
          break
        default:
          throw new Error(`Unsupported frequency: ${this.frequency}`)
      }
    }

    return count
  }

  /**
   * 日数を加算（元の時刻は維持）
   */
  #addDays(date, days) {
    date.setDate(date.getDate() + days)
  }

  /**
   * 月数を加算（JS の Date に任せる。存在しない日付は自動で繰り上がる）
   */
  #addMonths(date, months) {
    date.setMonth(date.getMonth() + months)
  }
}
