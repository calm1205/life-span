const MILLISECONDS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

/**
 * 生年月日から見て「直近の誕生日から現在までに経過した週数」を計算する
 * - 誕生日当日は 0 を返す
 * - 今年の誕生日を過ぎていれば、その今年の誕生日からの経過週数
 * - 今年の誕生日がまだ来ていなければ、前年の誕生日（まだ 1 回目の誕生日前なら生まれた日）からの経過週数
 * @param {Date} birthDate - 生年月日を表す Date オブジェクト
 * @param {Date} [today=new Date()] - 基準日（テスト用に任意指定可）
 * @returns {number} 直近の誕生日から現在までに経過した週数（0 以上の整数）
 */
export function weeksFromLastBirthday(birthDate, today = new Date()) {
  const birthYear = birthDate.getFullYear()
  const birthMonth = birthDate.getMonth()
  const birthDay = birthDate.getDate()

  // 時刻は切り捨てて日付単位で比較する
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )

  const thisYear = todayDate.getFullYear()
  const thisYearsBirthday = new Date(thisYear, birthMonth, birthDay)

  let lastBirthday

  if (todayDate.getTime() === thisYearsBirthday.getTime()) {
    // 今日は誕生日
    lastBirthday = thisYearsBirthday
  } else if (todayDate > thisYearsBirthday) {
    // 今年の誕生日を過ぎている場合 → 今年の誕生日が直近
    lastBirthday = thisYearsBirthday
  } else {
    // 今年の誕生日がまだ来ていない場合
    if (thisYear === birthYear) {
      // まだ 1 回目の誕生日を迎えていない → 生まれた日が直近の「誕生日」
      lastBirthday = new Date(birthYear, birthMonth, birthDay)
    } else {
      // 昨年の誕生日が直近
      lastBirthday = new Date(thisYear - 1, birthMonth, birthDay)
    }
  }

  const diffTime = todayDate.getTime() - lastBirthday.getTime()

  // 経過した週数なので切り捨て
  const diffWeeks = Math.floor(diffTime / MILLISECONDS_PER_WEEK)

  return Math.max(0, diffWeeks)
}
