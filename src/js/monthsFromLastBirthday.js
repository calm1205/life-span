/**
 * 生年月日から見て「直近の誕生日から現在までに経過した月数」を計算する
 * - 誕生日当日は 0 を返す
 * - 「○ヶ月目の記念日（毎月の誕生日と同じ日付）」を 1 ヶ月とカウントする
 *   例: 誕生日が 3 月 15 日なら、4 月 15 日で 1 ヶ月、5 月 15 日で 2 ヶ月
 * - 今年の誕生日を過ぎていれば、その今年の誕生日からの経過月数
 * - 今年の誕生日がまだ来ていなければ、前年の誕生日（まだ 1 回目の誕生日前なら生まれた日）からの経過月数
 * @param {Date} birthDate - 生年月日を表す Date オブジェクト
 * @param {Date} [today=new Date()] - 基準日（テスト用に任意指定可）
 * @returns {number} 直近の誕生日から現在までに経過した月数（0 以上の整数）
 */
export function monthsFromLastBirthday(birthDate, today = new Date()) {
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

  const lastYear = lastBirthday.getFullYear()
  const lastMonth = lastBirthday.getMonth()
  const lastDay = lastBirthday.getDate()

  // 年月差分（暦上の月数差）
  let diffMonths =
    (todayDate.getFullYear() - lastYear) * 12 +
    (todayDate.getMonth() - lastMonth)

  // 「月の記念日（同じ日付）」に達していない場合は 1 ヶ月分引く
  // 例: 誕生日 1/31, 今日 2/1 → まだ「1 ヶ月記念日(2/31 相当)」を迎えていないので 0 ヶ月
  if (todayDate.getDate() < lastDay) {
    diffMonths -= 1
  }

  return Math.max(0, diffMonths)
}
