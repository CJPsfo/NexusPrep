const highlight = document.querySelector(".highlight");
const syncButton = document.querySelector('[data-action="sync"]');
const sprintButton = document.querySelector('[data-action="sprint"]');
const lastSync = document.querySelector("#last-sync");
const syncStatus = document.querySelector("#sync-status");
const intakeList = document.querySelector("#intake-list");
const timeline = document.querySelector("#timeline");
const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".sidebar nav a");

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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

sprintButton?.addEventListener("click", () => {
  const now = new Date();
  if (!timeline) {
    return;
  }

  const row = document.createElement("div");
  row.classList.add("new");

  const time = document.createElement("span");
  time.textContent = formatTime(now);

  const label = document.createElement("strong");
  label.textContent = "Targeted Sprint · Deep Focus";

  row.append(time, label);
  timeline.prepend(row);
});

setTimeout(() => {
  highlight?.classList.add("pulse");
}, 500);
