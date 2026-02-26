import { getQueryDate } from "./getQueryDate.js"

/**
 * 人生の期待年数から現在までの残り時間を計算
 */
export class RemainTime {
  #EXPECTANCY_AGE = 90 // 人生の期待年数
  #DAYS_PER_YEAR = 365
  #HOURS_PER_YEAR = this.#DAYS_PER_YEAR * 24
  #MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

  constructor() {
    this.birthDate = getQueryDate()
    this.today = new Date()
  }

  /** 残り日数 */
  get days() {
    const days = this.#daysSinceBirth()
    return this.#EXPECTANCY_AGE * this.#DAYS_PER_YEAR - days
  }

  /** 残り時間 */
  get hours() {
    return this.days * this.#HOURS_PER_YEAR
  }

  #daysSinceBirth() {
    const todaysTime = this.today.getTime()
    const birthsTime = this.birthDate.getTime()
    const lifespanTime = Math.abs(todaysTime - birthsTime)
    return Math.ceil(lifespanTime / this.#MILLISECONDS_PER_DAY)
  }
}
