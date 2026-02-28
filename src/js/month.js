import { ElapsedTime } from "./elapsedTime.js"
import { getAge } from "./getAge.js"
import { getQueryDate } from "./getQueryDate.js"

const MAX_AGE = 90
const MONTHS_PER_YEAR = 12
const TOTAL_MONTHS = MAX_AGE * MONTHS_PER_YEAR

function createGrid(birthDate) {
  const age = getAge(birthDate)
  const container = document.getElementById("grid-container")
  const months = new ElapsedTime(birthDate).months
  const elapsedTotal = age * MONTHS_PER_YEAR + months
  const remainMonths = TOTAL_MONTHS - elapsedTotal
  document.getElementById("title").textContent = `Remain ${remainMonths.toLocaleString()} months.`
  const rows = Math.ceil(TOTAL_MONTHS / MONTHS_PER_YEAR)

  // ヘッダー（corner + 1〜12ヶ月）
  const headerHtml = `
      <div class="header-row">
        <div class="corner-cell"></div>
        ${Array.from({ length: MONTHS_PER_YEAR }, (_, i) => `<div class="month-label">${i + 1}</div>`).join("")}
      </div>
    `

  // 各年（row）の行
  const rowsHtml = Array.from({ length: rows }, (_, year) => {
    const monthCells = Array.from({ length: MONTHS_PER_YEAR }, (_, monthIndexInYear) => {
      const checked = (() => {
        if (year === age && monthIndexInYear === months) return "current"
        if (year < age) return "checked"
        if (year === age && monthIndexInYear < months) return "checked"
        return ""
      })()

      return `<div class="month-cell ${checked}"></div>`
    }).join("")
    const yearIndex = year % 5 === 0 ? year : "."

    return `
        <div class="year-row">
          <div class="year-label">${yearIndex}</div>
          ${monthCells}
        </div>
      `
  }).join("")

  container.innerHTML = headerHtml + rowsHtml
}

function displayMonths() {
  const birthDate = getQueryDate()

  if (birthDate) {
    createGrid(birthDate)
  } else {
    window.location.href = `index.html`
  }
}

window.onload = displayMonths
