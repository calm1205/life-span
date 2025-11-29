export function calculateDays(birthDate, today = new Date()) {
  const diffTime = Math.abs(today.getTime() - birthDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
