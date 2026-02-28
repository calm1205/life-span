/**
 * 生年月日を表す Date オブジェクトから年齢を計算する
 * @param {Date} birthDate - 生年月日
 * @param {Date} [today=new Date()] - 基準日（テスト用に任意指定可）
 * @returns {number} 年齢
 */
export function getAge(birthDate, today = new Date()) {
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}
