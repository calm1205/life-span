/**
 * query paramsから時間を取得
 * @param {string} search - sleepTime, wasteTime, workTime query params
 * @returns {Object}
 */
export function getQueryTime(search = window.location.search) {
  const params = new URLSearchParams(search)

  const sleepTime = Number(params.get("sleepTime"))
  const wasteTime = Number(params.get("wasteTime"))
  const workTime = Number(params.get("workTime"))

  if (
    Number.isNaN(sleepTime) ||
    Number.isNaN(wasteTime) ||
    Number.isNaN(workTime)
  )
    return null

  return { sleepTime, wasteTime, workTime }
}
