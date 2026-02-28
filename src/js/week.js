import { ElapsedTime } from "./elapsedTime.js"
import { getAge } from "./getAge.js"
import { getQueryDate } from "./getQueryDate.js"

const MAX_AGE = 90
const WEEKS_PER_YEAR = 52
const TOTAL_WEEKS = MAX_AGE * WEEKS_PER_YEAR

function createGrid(birthDate) {
  const age = getAge(birthDate)
  const container = document.getElementById("grid-container")
  const weeks = new ElapsedTime(birthDate).weeks
  const elapsedTotal = age * WEEKS_PER_YEAR + weeks
  const remainWeeks = TOTAL_WEEKS - elapsedTotal
  document.getElementById("title").textContent = `Remain ${remainWeeks.toLocaleString()} weeks.`
  const rows = Math.ceil(TOTAL_WEEKS / WEEKS_PER_YEAR)
  const weekPerYears = Array.from({ length: WEEKS_PER_YEAR }, (_, i) => i + 1)

  // ヘッダー行（corner + 1〜52）
  const headerHtml = `
      <div id="header-row" class="grid-header">
        <div id="corner-cell"></div>
        ${weekPerYears.map((week) => `<div>${week % 5 === 0 ? week : "."}</div>`).join("")}
      </div>
    `

  // 各年（row）の行
  const rowsHtml = Array.from({ length: rows }, (_, row) => {
    const weekCells = weekPerYears
      .map((col) => {
        const checked = (() => {
          const currentWeekCol = Math.min(weeks + 1, WEEKS_PER_YEAR)
          if (row === age && col === currentWeekCol) return "current"
          if (row < age) return "checked"
          if (row === age && col < currentWeekCol) return "checked"
          return ""
        })()

        return `<div class="week-cell ${checked}"></div>`
      })
      .join("")

    const rowIndex = row % 5 === 0 ? row : "."

    return `
        <div class="grid-row">
          <div class="row-index">${rowIndex}</div>
          ${weekCells}
        </div>
      `
  }).join("")

  // コンテナにまとめて流し込む
  container.innerHTML = headerHtml + rowsHtml
}

function displayWeeks() {
  const birthDate = getQueryDate()

  if (birthDate) {
    createGrid(birthDate)
  } else {
    window.location.href = `index.html`
  }
}

window.onload = displayWeeks
