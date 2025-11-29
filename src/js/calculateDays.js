const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24

// 生年月日から現在までの経過日数を計算
export function calculateDays(birthDate, today = new Date()) {
  const diffTime = Math.abs(today.getTime() - birthDate.getTime())
  const diffDays = Math.ceil(diffTime / MILLISECONDS_PER_DAY)
  return diffDays
}
