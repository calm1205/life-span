const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// 生年月日から現在までの経過日数を計算
export function daysSinceBirth(birthDate, today = new Date()) {
  const lifespanTime = Math.abs(today.getTime() - birthDate.getTime())
  const days = Math.ceil(lifespanTime / MILLISECONDS_PER_DAY)
  return days
}
