/**
 * 経過時間を扱うユーティリティクラス
 * - 現在日時と生年月日から「経過日数」などを計算する
 */
export class ElapsedTime {
  #MILLISECONDS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

  constructor(birthDate, today = new Date()) {
    this.birthDate = birthDate
    this.today = today
    this.thisYearsBirthday = new Date(this.today.getFullYear(), this.birthDate.getMonth(), this.birthDate.getDate())
  }

  /** 前回の誕生日から現在までの経過週数 */
  get weeks() {
    const lastBirthday = this.#lastBirthday()
    const diffTimes = Math.abs(this.today.getTime() - lastBirthday.getTime())
    const diffWeeks = Math.floor(diffTimes / this.#MILLISECONDS_PER_WEEK)
    return Math.max(0, diffWeeks)
  }

  /** 前回の誕生日から現在までの経過月数 */
  get months() {
    const lastBirthday = this.#lastBirthday()

    // 年と月の差分から「完全に経過した月数」を算出する
    let diffMonths =
      (this.today.getFullYear() - lastBirthday.getFullYear()) * 12 + (this.today.getMonth() - lastBirthday.getMonth())

    // 当月の誕生日「日」をまだ迎えていなければ、その月はまだ1ヶ月経過していないので 1 引く
    if (this.today.getDate() < lastBirthday.getDate()) {
      diffMonths -= 1
    }

    return Math.max(0, diffMonths)
  }

  #isAfterThisYearBirthday() {
    return this.today.getTime() > this.thisYearsBirthday.getTime()
  }

  #lastBirthday() {
    return this.#isAfterThisYearBirthday()
      ? this.thisYearsBirthday
      : new Date(this.thisYearsBirthday.getFullYear() - 1, this.birthDate.getMonth(), this.birthDate.getDate())
  }
}
