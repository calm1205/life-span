const DEFAULT_RANGE_SIZE = 100

/**
 * 現在の年から指定された範囲の年を配列で返す
 */
export const yearRange = (rangeSize = DEFAULT_RANGE_SIZE) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const rangeArray = Array.from({ length: rangeSize })

  return rangeArray.map((_, i) => currentYear - i)
}
