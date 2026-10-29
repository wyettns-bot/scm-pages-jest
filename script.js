"use strict";

let clicks = 0;

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Unique page-load function: builds a greeting based on the time of day
 * and how many days are left until the weekend.
 * @param {Date} date
 * @returns {string}
 */
function getVisitorGreeting(date) {
  const hour = date.getHours();
  const day = date.getDay();

  let timeOfDay;
  if (hour < 12) {
    timeOfDay = "Good morning";
  } else if (hour < 18) {
    timeOfDay = "Good afternoon";
  } else {
    timeOfDay = "Good evening";
  }

  let weekendNote;
  if (day === 0 || day === 6) {
    weekendNote = "Enjoy your weekend!";
  } else {
    const daysLeft = 6 - day;
    weekendNote = daysLeft + (daysLeft === 1 ? " day" : " days") + " until the weekend.";
  }

  return timeOfDay + "! Happy " + DAY_NAMES[day] + ". " + weekendNote;
}

function updateCount() {
  document.getElementById("count").textContent = String(clicks);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // Runs on page load
    document.getElementById("greeting").textContent = getVisitorGreeting(new Date());
    document.getElementById("loaded").textContent = new Date().toLocaleString();

    document.getElementById("clickBtn").addEventListener("click", () => {
      clicks += 1;
      updateCount();
    });

    document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  });
}

// Export for Jest (ignored in the browser)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getVisitorGreeting };
}
