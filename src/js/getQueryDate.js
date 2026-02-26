/**
 * query paramsからDateオブジェクトを取得
 * @param {string} search - year, month, day query params
 * @returns {Date | null}
 */
export function getQueryDate(search = window.location.search) {
  const params = new URLSearchParams(search)

  const year = params.get("year")
  const month = params.get("month")
  const day = params.get("day")

  if (!year || !month || !day) return null

  const y = Number(year)
  const m = Number(month)
  const d = Number(day)

  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d))
    return null

  // JavaScript の Date コンストラクタは month が 0 始まりなので 1 を引く
  const date = new Date(y, m - 1, d)

  // 無効な日付（例: 2024-13-40 など）を検出
  if (Number.isNaN(date.getTime())) return null

  return date
}
