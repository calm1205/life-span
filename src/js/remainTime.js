import { daysSinceBirth } from "./daysSinceBirth.js"
import { getQueryDate } from "./getQueryDate.js"

/**
 * 人生の期待年数から現在までの残り時間を計算
 */
export class RemainTime {
  #EXPECTANCY_AGE = 90 // 人生の期待年数
  #DAYS_PER_YEAR = 365
  #HOURS_PER_YEAR = this.#DAYS_PER_YEAR * 24

  constructor() {
    this.birthDate = getQueryDate()
    this.today = new Date()
  }

  /** 残り日数 */
  get days() {
    const days = daysSinceBirth(this.birthDate)
    return this.#EXPECTANCY_AGE * this.#DAYS_PER_YEAR - days
  }

  /** 残り時間 */
  get hours() {
    return this.days * this.#HOURS_PER_YEAR
  }
}
