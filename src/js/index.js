const MAX_AGE = 90
const today = new Date()
const minYear = today.getFullYear() - MAX_AGE
const birthdaySelect = document.getElementById("birthday")
birthdaySelect.min = `${minYear}-01-01`

// visualize your lifespan
const navigate = (path) => (e) => {
  e.preventDefault()
  const birthday = birthdaySelect.value
  const birthdayDate = new Date(birthday)
  const year = birthdayDate.getFullYear()
  const month = birthdayDate.getMonth() + 1
  const day = birthdayDate.getDate()
  window.location.href = `${path}.html?year=${year}&month=${month}&day=${day}`
}

const hoursButton = document.getElementById("hours-button")
const daysButton = document.getElementById("days-button")
const weeksButton = document.getElementById("weeks-button")
const monthsButton = document.getElementById("months-button")

hoursButton.addEventListener("click", navigate("hour"))
daysButton.addEventListener("click", navigate("day"))
weeksButton.addEventListener("click", navigate("week"))
monthsButton.addEventListener("click", navigate("month"))

// visualize your available time
const visualizeAvailableTime = (e) => {
  e.preventDefault()
  const birthday = birthdaySelect.value
  const birthdayDate = new Date(birthday)
  const year = birthdayDate.getFullYear()
  const month = birthdayDate.getMonth() + 1
  const day = birthdayDate.getDate()
  const sleepTime = document.getElementById("sleep-time").value
  const wasteTime = document.getElementById("waste-time").value
  const workTime = document.getElementById("work-time").value
  window.location.href = `available.html?year=${year}&month=${month}&day=${day}&sleepTime=${sleepTime}&wasteTime=${wasteTime}&workTime=${workTime}`
}

document.getElementById("visualize-available-time-button").addEventListener("click", visualizeAvailableTime)
