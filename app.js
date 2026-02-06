const highlight = document.querySelector(".highlight");
const syncButton = document.querySelector('[data-action="sync"]');
const focusButton = document.querySelector('[data-action="focus"]');
const lastSync = document.querySelector("#last-sync");
const syncStatus = document.querySelector("#sync-status");
const intakeList = document.querySelector("#intake-list");
const timeline = document.querySelector("#timeline");
const revealItems = document.querySelectorAll(".reveal");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarTabs = document.querySelectorAll("[data-view]");
const navLinks = document.querySelectorAll(".sidebar nav a");

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const calendarData = {
  day: [
    { label: "08:10 Physics Focus", level: "high" },
    { label: "11:30 Calculus Drill", level: "high" },
    { label: "18:00 Recovery Block", level: "medium" },
    { label: "Evening Review", level: "low" },
  ],
  week: [
    { label: "Mon: Physics Focus", level: "high" },
    { label: "Tue: Calculus Drill", level: "high" },
    { label: "Wed: AP Lit Draft", level: "medium" },
    { label: "Thu: Quiz Prep", level: "medium" },
    { label: "Fri: Recovery", level: "low" },
  ],
  month: [
    { label: "Focus Cycle A", level: "high" },
    { label: "Midterm Block", level: "high" },
    { label: "Writing Milestones", level: "medium" },
    { label: "Weekly Recovery", level: "low" },
  ],
  year: [
    { label: "Fall Exams", level: "high" },
    { label: "AP Review", level: "high" },
    { label: "Season Training", level: "medium" },
    { label: "Flex Buffer", level: "low" },
  ],
};

const calendarCells = {
  day: ["Today"],
  week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  month: [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
  ],
  year: ["Q1", "Q2", "Q3", "Q4"],
};

const levelThreshold = {
  day: ["high", "medium", "low"],
  week: ["high", "medium"],
  month: ["high", "medium"],
  year: ["high"],
};

const renderCalendar = (view) => {
  if (!calendarGrid) {
    return;
  }

  calendarGrid.className = `calendar-grid view-${view}`;
  calendarGrid.innerHTML = "";

  calendarCells[view].forEach((label) => {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";

    const title = document.createElement("div");
    title.className = "cell-label";
    title.textContent = label;
    cell.appendChild(title);

    const items = calendarData[view].filter((item) =>
      levelThreshold[view].includes(item.level)
    );

    items.forEach((item) => {
      const entry = document.createElement("div");
      entry.className = `calendar-item ${item.level}`;
      entry.textContent = item.label;
      cell.appendChild(entry);
    });

    calendarGrid.appendChild(cell);
  });
};

if (calendarGrid && calendarTabs.length) {
  calendarTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      calendarTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderCalendar(tab.dataset.view);
    });
  });

  renderCalendar("day");
}

const setSyncFeedback = (message) => {
  if (syncStatus) {
    syncStatus.textContent = message;
    return;
  }

  if (!syncButton) {
    return;
  }

  const original = syncButton.textContent;
  syncButton.textContent = "Synced";
  setTimeout(() => {
    syncButton.textContent = original;
  }, 1200);
};

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((el) => observer.observe(el));
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

syncButton?.addEventListener("click", () => {
  syncButton.textContent = "Syncing...";
  syncButton.disabled = true;

  setTimeout(() => {
    const now = new Date();
    if (lastSync) {
      lastSync.textContent = "Last sync: just now";
    }

    setSyncFeedback("Last intake: just now");

    if (intakeList) {
      const item = document.createElement("li");
      item.textContent = `Worksheet scan · ${formatTime(now)}`;
      intakeList.prepend(item);
    }

    syncButton.textContent = "Sync Inputs";
    syncButton.disabled = false;
  }, 700);
});

focusButton?.addEventListener("click", () => {
  const now = new Date();
  if (!timeline) {
    return;
  }

  const row = document.createElement("div");
  row.classList.add("new");

  const time = document.createElement("span");
  time.textContent = formatTime(now);

  const label = document.createElement("strong");
  label.textContent = "Targeted Focus · Deep Work";

  row.append(time, label);
  timeline.prepend(row);
});

setTimeout(() => {
  highlight?.classList.add("pulse");
}, 500);
