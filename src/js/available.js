import { ElapsedTime } from "./elapsedTime.js"
import { getAge } from "./getAge.js"
import { getQueryDate } from "./getQueryDate.js"
import { getQueryTime } from "./getQueryTime.js"
import { FREQUENCIES, RecurringTime } from "./recurringTime.js"

const MAX_AGE = 90
const WEEKS_PER_YEAR = 52
const TOTAL_WEEKS = MAX_AGE * WEEKS_PER_YEAR

function createGrid(birthDate, sleepTime, wasteTime, workTime) {
  const age = getAge(birthDate)
  const container = document.getElementById("grid-container")
  const elapsedWeeks = new ElapsedTime(birthDate).weeks
  const rows = Math.ceil(TOTAL_WEEKS / WEEKS_PER_YEAR)
  const weekPerYears = Array.from({ length: WEEKS_PER_YEAR }, (_, i) => i + 1)

  // ヘッダー行（corner + 1〜52）
  const headerHtml = `
      <div id="header-row" class="grid-header">
        <div id="corner-cell"></div>
        ${weekPerYears.map((week) => `<div>${week % 5 === 0 ? week : "."}</div>`).join("")}
      </div>
    `

  const sleepRecurring = new RecurringTime(sleepTime, FREQUENCIES.DAILY, birthDate)
  const wasteRecurring = new RecurringTime(wasteTime, FREQUENCIES.DAILY, birthDate)
  const workRecurring = new RecurringTime(workTime, FREQUENCIES.WEEKLY, birthDate)

  const livedWeekCount = age * WEEKS_PER_YEAR + elapsedWeeks
  const sleepWeekCount = sleepRecurring.getTotalWeeks()
  const wasteWeekCount = wasteRecurring.getTotalWeeks()
  const workWeekCount = workRecurring.getTotalWeeks()

  let weekCount = 0
  const rowsHtml = Array.from({ length: rows }, (_, row) => {
    const weekCells = weekPerYears
      .map((_) => {
        const label = (() => {
          if (weekCount < livedWeekCount) {
            return "lived"
          } else if (weekCount < livedWeekCount + sleepWeekCount) {
            return "sleep"
          } else if (weekCount < livedWeekCount + sleepWeekCount + wasteWeekCount) {
            return "waste"
          } else if (weekCount < livedWeekCount + sleepWeekCount + wasteWeekCount + workWeekCount) {
            return "work"
          }
          return ""
        })()
        weekCount++
        return `<div class="week-cell ${label}"></div>`
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
  const { sleepTime, wasteTime, workTime } = getQueryTime()

  if (birthDate) {
    createGrid(birthDate, sleepTime, wasteTime, workTime)
  } else {
    window.location.href = `index.html`
  }
}

window.onload = displayWeeks
