const highlight = document.querySelector(".highlight");
const syncButton = document.querySelector('[data-action="sync"]');
const focusButton = document.querySelector('[data-action="focus"]');
const assignmentButtons = document.querySelectorAll('[data-action="assignment"]');
const lastSync = document.querySelector("#last-sync");
const syncStatus = document.querySelector("#sync-status");
const intakeList = document.querySelector("#intake-list");
const timeline = document.querySelector("#timeline");
const planner = document.querySelector(".planner");
const blockList = document.querySelector("#block-list");
const assignmentList = document.querySelector("#assignment-list");
const revealItems = document.querySelectorAll(".reveal");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarTabs = document.querySelectorAll("[data-view]");
const profileName = document.querySelector("#profile-name");
const logoutButton = document.querySelector("#logout");
const navLinks = document.querySelectorAll(".sidebar nav a");
const requiresAuth = document.body.classList.contains("requires-auth");
const focusModal = document.querySelector("#focus-modal");
const focusForm = document.querySelector("#focus-form");
const focusIdField = document.querySelector("#focus-id");
const focusAssignment = document.querySelector("#focus-assignment");
const focusCompleted = document.querySelector("#focus-completed");
const focusStatus = document.querySelector("#focus-status");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const assignmentModal = document.querySelector("#assignment-modal");
const assignmentForm = document.querySelector("#assignment-form");
const assignmentIdField = document.querySelector("#assignment-id");
const assignmentTurnIn = document.querySelector("#assignment-turnin");
const assignmentStatus = document.querySelector("#assignment-status");
const assignmentCloseButtons = document.querySelectorAll("[data-assignment-close]");
const nexusForm = document.querySelector("#nexus-form");
const nexusSource = document.querySelector("#nexus-source");
const nexusText = document.querySelector("#nexus-text");
const nexusClearButton = document.querySelector("#nexus-clear");
const nexusStatus = document.querySelector("#nexus-status");
const nexusSignalList = document.querySelector("#nexus-signal-list");
const nexusSuggestionList = document.querySelector("#nexus-suggestion-list");
const aiSettingsForm = document.querySelector("#ai-settings-form");
const aiProvider = document.querySelector("#ai-provider");
const aiModel = document.querySelector("#ai-model");
const aiApiKey = document.querySelector("#ai-api-key");
const aiKeyEnabled = document.querySelector("#ai-key-enabled");
const aiSettingsClearButton = document.querySelector("#ai-settings-clear");
const aiSettingsStatus = document.querySelector("#ai-settings-status");

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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

let currentView = "day";
const STORAGE_KEY = "vertex_focus_blocks";
const ASSIGNMENT_KEY = "vertex_assignments";
const AI_SETTINGS_KEY = "vertex_ai_settings";
const NEXUS_RUNS_KEY = "vertex_nexus_runs";

const loadBlocks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveBlocks = (blocks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
};

let focusBlocks = loadBlocks();

const loadAssignments = () => {
  try {
    const raw = localStorage.getItem(ASSIGNMENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveAssignments = (assignments) => {
  localStorage.setItem(ASSIGNMENT_KEY, JSON.stringify(assignments));
};

let assignments = loadAssignments();

const loadAiSettings = () => {
  try {
    const raw = localStorage.getItem(AI_SETTINGS_KEY);
    return raw
      ? JSON.parse(raw)
      : { provider: "openai", model: "gpt-4.1-mini", apiKey: "", enabled: false };
  } catch (error) {
    return { provider: "openai", model: "gpt-4.1-mini", apiKey: "", enabled: false };
  }
};

const saveAiSettings = (settings) => {
  localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(settings));
};

let aiSettings = loadAiSettings();

const loadNexusRuns = () => {
  try {
    const raw = localStorage.getItem(NEXUS_RUNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveNexusRuns = (runs) => {
  localStorage.setItem(NEXUS_RUNS_KEY, JSON.stringify(runs));
};

let nexusRuns = loadNexusRuns();

const maskKey = (value) => {
  if (!value) {
    return "No key saved";
  }
  if (value.length <= 8) {
    return "Saved";
  }
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const parseDueDateFromText = (text) => {
  if (!text) {
    return "";
  }

  const isoMatch = text.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  if (isoMatch) {
    return isoMatch[1];
  }

  const slashMatch = text.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (slashMatch) {
    const now = new Date();
    const month = String(Number(slashMatch[1])).padStart(2, "0");
    const day = String(Number(slashMatch[2])).padStart(2, "0");
    const yearRaw = slashMatch[3];
    const year =
      yearRaw && yearRaw.length === 2
        ? `20${yearRaw}`
        : yearRaw || String(now.getFullYear());
    return `${year}-${month}-${day}`;
  }

  if (/\btomorrow\b/i.test(text)) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  return "";
};

const parseHoursFromText = (text, source) => {
  const hoursMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)/i);
  if (hoursMatch) {
    return Math.max(1, Math.round(Number(hoursMatch[1])));
  }

  const minutesMatch = text.match(/(\d+)\s*minutes?/i);
  if (minutesMatch) {
    return Math.max(1, Math.ceil(Number(minutesMatch[1]) / 60));
  }

  const defaults = {
    assignment: 3,
    syllabus: 2,
    notes: 1,
    exam: 4,
  };
  return defaults[source] || 2;
};

const parseTurnInType = (text) => {
  if (/(paper copy|printed|hand in|physical)/i.test(text)) {
    return "physical";
  }
  if (/(online|canvas|google classroom|upload|submit online)/i.test(text)) {
    return "online";
  }
  return "online";
};

const parseTitleFromText = (text, source) => {
  const firstLine = text
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);
  if (!firstLine) {
    return source === "exam" ? "Exam Prep" : "Nexus Intake Item";
  }

  return firstLine.replace(/\.$/, "").slice(0, 80);
};

const inferPriorityFromDueDate = (dueDate) => {
  if (!dueDate) {
    return "medium";
  }
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return "medium";
  }
  const now = new Date();
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  if (diffDays <= 2) {
    return "high";
  }
  if (diffDays <= 7) {
    return "medium";
  }
  return "low";
};

const buildSuggestedSessions = (hours, dueDate, priority, assignmentTitle) => {
  const totalMinutes = Math.max(60, Number(hours || 1) * 60);
  const sessionMinutes = totalMinutes >= 180 ? 60 : 45;
  const sessionCount = Math.max(1, Math.ceil(totalMinutes / sessionMinutes));
  const now = new Date();
  const due = dueDate ? new Date(dueDate) : null;
  const spanDays =
    due && !Number.isNaN(due.getTime())
      ? Math.max(0, Math.min(14, Math.ceil((due - now) / (1000 * 60 * 60 * 24))))
      : 0;

  return Array.from({ length: sessionCount }, (_, index) => {
    const date = new Date(now);
    date.setDate(date.getDate() + Math.min(index, spanDays));
    const hour = 16 + (index % 3);
    date.setHours(hour, 0, 0, 0);

    return {
      date: date.toISOString().slice(0, 10),
      time: `${String(hour).padStart(2, "0")}:00`,
      duration: sessionMinutes,
      priority,
      title: `${assignmentTitle} · Focus`,
    };
  });
};

const createNexusSuggestion = (source, text) => {
  const due = parseDueDateFromText(text);
  const hours = parseHoursFromText(text, source);
  const turnIn = parseTurnInType(text);
  const title = parseTitleFromText(text, source);
  const priority = inferPriorityFromDueDate(due);
  const sessions = buildSuggestedSessions(hours, due, priority, title);

  return {
    id: crypto.randomUUID?.() || String(Date.now()),
    source,
    rawText: text,
    createdAt: Date.now(),
    assignment: {
      title,
      due: due || new Date().toISOString().slice(0, 10),
      hours,
      turnIn,
      priority,
    },
    sessions,
    appliedAssignmentId: "",
    appliedBlockIds: [],
  };
};

const renderCalendar = (view) => {
  if (!calendarGrid) {
    return;
  }

  currentView = view;
  calendarGrid.className = `calendar-grid view-${view}`;
  calendarGrid.innerHTML = "";

  const buckets = {};
  calendarCells[view].forEach((label) => {
    buckets[label] = [];
  });

  const mapToBucket = (block) => {
    if (!block?.date) {
      return calendarCells[view][0];
    }
    const date = new Date(block.date);
    if (Number.isNaN(date.getTime())) {
      return calendarCells[view][0];
    }

    if (view === "day") {
      return calendarCells[view][0];
    }
    if (view === "week") {
      return calendarCells.week[date.getDay() === 0 ? 6 : date.getDay() - 1];
    }
    if (view === "month") {
      const weekIndex = Math.min(6, Math.floor((date.getDate() - 1) / 7));
      return calendarCells.month[weekIndex];
    }
    if (view === "year") {
      const quarter = Math.floor(date.getMonth() / 3);
      return calendarCells.year[quarter];
    }
    return calendarCells[view][0];
  };

  focusBlocks.forEach((block) => {
    if (!levelThreshold[view].includes(block.priority)) {
      return;
    }
    const bucket = mapToBucket(block);
    buckets[bucket]?.push(block);
  });

  calendarCells[view].forEach((label) => {
    const cell = document.createElement("div");
    cell.className = "calendar-cell";

    const title = document.createElement("div");
    title.className = "cell-label";
    title.textContent = label;
    cell.appendChild(title);

    const items = buckets[label] || [];

    if (!items.length) {
      const empty = document.createElement("div");
      empty.className = "calendar-item low";
      empty.textContent = "No focus blocks yet";
      cell.appendChild(empty);
    } else {
      items.forEach((item) => {
        const entry = document.createElement("div");
        entry.className = `calendar-item ${item.priority}`;
        if (item.completed) {
          entry.classList.add("completed");
        }
        entry.textContent = item.title;
        cell.appendChild(entry);
      });
    }

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

const ensureSession = () => {
  if (!requiresAuth) {
    return;
  }

  const raw = localStorage.getItem("vertex_demo_auth");
  if (!raw) {
    window.location.href = "login.html";
    return;
  }

  try {
    const payload = JSON.parse(raw);
    if (profileName) {
      profileName.textContent = payload.email || "Demo User";
    }
  } catch (error) {
    localStorage.removeItem("vertex_demo_auth");
    window.location.href = "login.html";
  }
};

logoutButton?.addEventListener("click", () => {
  localStorage.removeItem("vertex_demo_auth");
  window.location.href = "login.html";
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
      item.textContent = `Availability sync · ${formatTime(now)}`;
      intakeList.prepend(item);
    }

    syncButton.textContent = "Sync Inputs";
    syncButton.disabled = false;
  }, 700);
});

const openModal = (block) => {
  if (!focusModal || !focusForm) {
    return;
  }

  renderAssignmentOptions();

  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const dateValue = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
  const timeValue = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  if (block) {
    focusForm.title.value = block.title;
    focusForm.date.value = block.date || dateValue;
    focusForm.time.value = block.time || timeValue;
    focusForm.duration.value = block.duration || 60;
    focusForm.priority.value = block.priority || "medium";
    focusForm.notes.value = block.notes || "";
    if (focusAssignment) {
      focusAssignment.value = block.assignmentId || "";
    }
    if (focusCompleted) {
      focusCompleted.checked = Boolean(block.completed);
    }
    if (focusIdField) {
      focusIdField.value = block.id;
    }
    focusStatus.textContent = "Update your focus block details.";
  } else {
    focusForm.reset();
    focusForm.date.value = dateValue;
    focusForm.time.value = timeValue;
    if (focusAssignment) {
      focusAssignment.value = "";
    }
    if (focusCompleted) {
      focusCompleted.checked = false;
    }
    if (focusIdField) {
      focusIdField.value = "";
    }
    focusStatus.textContent = "Blocks appear immediately in your timeline.";
  }

  focusModal.classList.add("open");
  focusModal.setAttribute("aria-hidden", "false");
};

focusButton?.addEventListener("click", () => openModal());

const openAssignmentModal = (assignment) => {
  if (!assignmentModal || !assignmentForm) {
    return;
  }

  closeModal();

  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  const dateValue = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;

  if (assignment) {
    assignmentForm.title.value = assignment.title;
    assignmentForm.due.value = assignment.due || dateValue;
    assignmentForm.hours.value = assignment.hours || 4;
    if (assignmentTurnIn) {
      assignmentTurnIn.value = assignment.turnIn || "online";
    }
    if (assignmentIdField) {
      assignmentIdField.value = assignment.id;
    }
    assignmentStatus.textContent = "Update assignment details.";
  } else {
    assignmentForm.reset();
    assignmentForm.due.value = dateValue;
    if (assignmentTurnIn) {
      assignmentTurnIn.value = "online";
    }
    if (assignmentIdField) {
      assignmentIdField.value = "";
    }
    assignmentStatus.textContent = "Assignments sync across all pages.";
  }

  assignmentModal.classList.add("open");
  assignmentModal.setAttribute("aria-hidden", "false");
};

assignmentButtons.forEach((button) => {
  button.addEventListener("click", () => openAssignmentModal());
});

setTimeout(() => {
  highlight?.classList.add("pulse");
}, 500);

ensureSession();

const closeModal = () => {
  if (!focusModal) {
    return;
  }
  focusModal.classList.remove("open");
  focusModal.setAttribute("aria-hidden", "true");
};

const closeAssignmentModal = () => {
  if (!assignmentModal) {
    return;
  }
  assignmentModal.classList.remove("open");
  assignmentModal.setAttribute("aria-hidden", "true");
};

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

assignmentCloseButtons.forEach((button) => {
  button.addEventListener("click", closeAssignmentModal);
});

focusModal?.addEventListener("click", (event) => {
  if (event.target?.classList.contains("modal-backdrop")) {
    closeModal();
  }
});

assignmentModal?.addEventListener("click", (event) => {
  if (event.target?.classList.contains("modal-backdrop")) {
    closeAssignmentModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && focusModal?.classList.contains("open")) {
    closeModal();
  }
  if (event.key === "Escape" && assignmentModal?.classList.contains("open")) {
    closeAssignmentModal();
  }
});

const renderTimeline = () => {
  if (!timeline) {
    return;
  }
  timeline.innerHTML = "";
  if (!focusBlocks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No focus blocks yet.";
    timeline.appendChild(empty);
    return;
  }

  focusBlocks.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("new");
    row.classList.toggle("is-complete", Boolean(item.completed));

    const timeStamp = document.createElement("span");
    timeStamp.textContent = item.time;

    const label = document.createElement("strong");
    label.textContent = `${item.title} · ${item.duration}m${
      item.assignmentTitle ? ` · ${item.assignmentTitle}` : ""
    }`;

    const actions = document.createElement("div");
    actions.className = "block-actions";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.textContent = item.completed ? "Undo" : "Complete";
    toggle.addEventListener("click", () => toggleBlockCompletion(item.id));

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "primary";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => openModal(item));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteBlock(item.id));

    actions.append(toggle, edit, remove);
    row.append(timeStamp, label, actions);
    timeline.appendChild(row);
  });
};

const renderPlanner = () => {
  if (!planner) {
    return;
  }
  planner.innerHTML = "";
  if (!focusBlocks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No focus blocks scheduled yet.";
    planner.appendChild(empty);
    return;
  }

  focusBlocks.forEach((item) => {
    const plannerItem = document.createElement("div");
    plannerItem.className = "block-item";
    plannerItem.classList.toggle("is-complete", Boolean(item.completed));

    const title = document.createElement("strong");
    title.textContent = item.title;

    const meta = document.createElement("div");
    meta.className = "block-meta";
    meta.textContent = `${item.date} · ${item.time} · ${item.duration}m · ${item.priority.toUpperCase()}${
      item.assignmentTitle ? ` · ${item.assignmentTitle}` : ""
    }`;

    const actions = document.createElement("div");
    actions.className = "block-actions";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.textContent = item.completed ? "Undo" : "Complete";
    toggle.addEventListener("click", () => toggleBlockCompletion(item.id));

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "primary";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => openModal(item));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteBlock(item.id));

    actions.append(toggle, edit, remove);
    plannerItem.append(title, meta, actions);
    planner.appendChild(plannerItem);
  });
};

const renderBlockList = () => {
  if (!blockList) {
    return;
  }
  blockList.innerHTML = "";
  if (!focusBlocks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No focus blocks scheduled yet.";
    blockList.appendChild(empty);
    return;
  }

  focusBlocks.forEach((item) => {
    const entry = document.createElement("div");
    entry.className = "block-item";
    entry.classList.toggle("is-complete", Boolean(item.completed));

    const title = document.createElement("strong");
    title.textContent = item.title;

    const meta = document.createElement("div");
    meta.className = "block-meta";
    meta.textContent = `${item.date} · ${item.time} · ${item.duration}m · ${item.priority.toUpperCase()}${
      item.assignmentTitle ? ` · ${item.assignmentTitle}` : ""
    }`;

    const actions = document.createElement("div");
    actions.className = "block-actions";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.textContent = item.completed ? "Undo" : "Complete";
    toggle.addEventListener("click", () => toggleBlockCompletion(item.id));

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "primary";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => openModal(item));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteBlock(item.id));

    actions.append(toggle, edit, remove);
    entry.append(title, meta, actions);
    blockList.appendChild(entry);
  });
};

const renderAssignmentOptions = () => {
  if (!focusAssignment) {
    return;
  }
  focusAssignment.innerHTML = "";
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "No assignment";
  focusAssignment.appendChild(emptyOption);

  assignments.forEach((assignment) => {
    const option = document.createElement("option");
    option.value = assignment.id;
    option.textContent = assignment.title;
    focusAssignment.appendChild(option);
  });
};

const renderAssignmentList = () => {
  if (!assignmentList) {
    return;
  }
  assignmentList.innerHTML = "";
  if (!assignments.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No assignments yet.";
    assignmentList.appendChild(empty);
    return;
  }

  assignments.forEach((assignment) => {
    const totalMinutes = focusBlocks
      .filter((block) => block.assignmentId === assignment.id)
      .reduce((sum, block) => sum + Number(block.duration || 0), 0);
    const completedMinutes = focusBlocks
      .filter((block) => block.assignmentId === assignment.id && block.completed)
      .reduce((sum, block) => sum + Number(block.duration || 0), 0);
    const estimatedMinutes = Number(assignment.hours || 0) * 60;
    const completionPct =
      estimatedMinutes > 0
        ? Math.min(100, Math.round((completedMinutes / estimatedMinutes) * 100))
        : 0;

    const card = document.createElement("div");
    card.className = "assignment-card";
    if (completionPct === 100 && totalMinutes > 0) {
      card.classList.add("is-complete");
    }

    const title = document.createElement("h4");
    title.textContent = assignment.title;

    const meta = document.createElement("div");
    meta.className = "assignment-meta";
    const turnInLabel =
      assignment.turnIn === "physical" ? "Physical" : "Online";
    meta.textContent = `Due ${assignment.due} · Est ${assignment.hours}h · ${turnInLabel} turn-in · Scheduled ${Math.round(
      totalMinutes
    )}m · Completed ${Math.round(completedMinutes)}m (${completionPct}%)`;

    const actions = document.createElement("div");
    actions.className = "block-actions";

    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "primary";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => openAssignmentModal(assignment));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteAssignment(assignment.id));

    actions.append(edit, remove);
    card.append(title, meta, actions);
    assignmentList.appendChild(card);
  });
};

const renderAiSettings = () => {
  if (!aiSettingsForm) {
    return;
  }

  if (aiProvider) {
    aiProvider.value = aiSettings.provider || "openai";
  }
  if (aiModel) {
    aiModel.value = aiSettings.model || "gpt-4.1-mini";
  }
  if (aiApiKey) {
    aiApiKey.value = aiSettings.apiKey || "";
  }
  if (aiKeyEnabled) {
    aiKeyEnabled.checked = Boolean(aiSettings.enabled);
  }

  if (aiSettingsStatus) {
    const enabledLabel =
      aiSettings.enabled && aiSettings.apiKey
        ? "API mode ready"
        : "Local prep mode (no live API calls)";
    aiSettingsStatus.textContent = `${enabledLabel} · ${maskKey(aiSettings.apiKey)}`;
  }
};

const renderNexusSignals = () => {
  if (!nexusSignalList) {
    return;
  }

  nexusSignalList.innerHTML = "";
  if (!nexusRuns.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No Nexus runs yet.";
    nexusSignalList.appendChild(empty);
    return;
  }

  nexusRuns.slice(0, 6).forEach((run) => {
    const item = document.createElement("div");
    item.className = "nexus-item";
    item.innerHTML = `
      <strong>${escapeHtml(run.assignment.title)}</strong>
      <div class="block-meta">
        <span>${escapeHtml(run.source)}</span>
        <span>Due ${escapeHtml(run.assignment.due || "TBD")}</span>
        <span>${escapeHtml(String(run.assignment.hours))}h estimate</span>
        <span>${escapeHtml(run.assignment.turnIn)} turn-in</span>
      </div>
    `;
    nexusSignalList.appendChild(item);
  });
};

const addFocusBlock = (input) => {
  const block = {
    id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
    title: input.title || "Focus Block",
    date: input.date || new Date().toISOString().slice(0, 10),
    time: input.time || "16:00",
    duration: String(input.duration || 60),
    priority: input.priority || "medium",
    notes: input.notes || "",
    assignmentId: input.assignmentId || "",
    assignmentTitle: input.assignmentTitle || "",
    completed: Boolean(input.completed),
    createdAt: Date.now(),
  };
  focusBlocks.unshift(block);
  return block.id;
};

const addAssignment = (input) => {
  const assignment = {
    id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
    title: input.title || "Untitled Assignment",
    due: input.due || new Date().toISOString().slice(0, 10),
    hours: String(input.hours || 1),
    turnIn: input.turnIn || "online",
    createdAt: Date.now(),
  };
  assignments.unshift(assignment);
  return assignment;
};

const applyNexusSuggestion = (runId, includeBlocks) => {
  const runIndex = nexusRuns.findIndex((run) => run.id === runId);
  if (runIndex < 0) {
    return;
  }

  const run = nexusRuns[runIndex];
  let assignment =
    assignments.find((item) => item.id === run.appliedAssignmentId) || null;

  if (!assignment) {
    assignment = addAssignment({
      title: run.assignment.title,
      due: run.assignment.due,
      hours: run.assignment.hours,
      turnIn: run.assignment.turnIn,
    });
  }

  const blockIds = [...(run.appliedBlockIds || [])];
  if (includeBlocks && blockIds.length === 0) {
    run.sessions.forEach((session) => {
      const blockId = addFocusBlock({
        title: session.title,
        date: session.date,
        time: session.time,
        duration: session.duration,
        priority: session.priority,
        assignmentId: assignment.id,
        assignmentTitle: assignment.title,
        notes: "Created by Nexus Prep",
      });
      blockIds.push(blockId);
    });
  }

  nexusRuns[runIndex] = {
    ...run,
    appliedAssignmentId: assignment.id,
    appliedBlockIds: blockIds,
  };

  saveAssignments(assignments);
  saveBlocks(focusBlocks);
  saveNexusRuns(nexusRuns);
  renderAll();

  if (nexusStatus) {
    nexusStatus.textContent = includeBlocks
      ? "Assignment and focus blocks added to Vertex."
      : "Assignment added to Vertex.";
  }
};

const renderNexusSuggestions = () => {
  if (!nexusSuggestionList) {
    return;
  }

  nexusSuggestionList.innerHTML = "";
  if (!nexusRuns.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Run Nexus Prep to generate suggestions.";
    nexusSuggestionList.appendChild(empty);
    return;
  }

  nexusRuns.slice(0, 8).forEach((run) => {
    const item = document.createElement("div");
    item.className = "nexus-item";

    const heading = document.createElement("strong");
    heading.textContent = run.assignment.title;

    const meta = document.createElement("div");
    meta.className = "block-meta";
    const turnInLabel = run.assignment.turnIn === "physical" ? "Physical" : "Online";
    meta.textContent = `Due ${run.assignment.due} · ${run.assignment.hours}h · ${turnInLabel} turn-in · ${run.sessions.length} block suggestion(s)`;

    const source = document.createElement("p");
    source.className = "nexus-preview";
    source.textContent = run.rawText.slice(0, 180);

    const actions = document.createElement("div");
    actions.className = "block-actions";

    const addAssignmentButton = document.createElement("button");
    addAssignmentButton.type = "button";
    addAssignmentButton.textContent = "Create Assignment";
    addAssignmentButton.addEventListener("click", () =>
      applyNexusSuggestion(run.id, false)
    );

    const addAllButton = document.createElement("button");
    addAllButton.type = "button";
    addAllButton.className = "primary";
    addAllButton.textContent = "Create + Schedule";
    addAllButton.addEventListener("click", () =>
      applyNexusSuggestion(run.id, true)
    );

    actions.append(addAssignmentButton, addAllButton);

    if (run.appliedAssignmentId) {
      const badge = document.createElement("div");
      badge.className = "nexus-badge";
      badge.textContent = "Synced to planner";
      item.append(badge);
    }

    item.append(heading, meta, source, actions);
    nexusSuggestionList.appendChild(item);
  });
};

const renderAll = () => {
  renderTimeline();
  renderPlanner();
  renderBlockList();
  renderAssignmentList();
  renderAssignmentOptions();
  renderAiSettings();
  renderNexusSignals();
  renderNexusSuggestions();
  renderCalendar(currentView);
};

const deleteBlock = (id) => {
  focusBlocks = focusBlocks.filter((block) => block.id !== id);
  saveBlocks(focusBlocks);
  renderAll();
};

const toggleBlockCompletion = (id) => {
  focusBlocks = focusBlocks.map((block) =>
    block.id === id
      ? { ...block, completed: !block.completed, completedAt: Date.now() }
      : block
  );
  saveBlocks(focusBlocks);
  renderAll();
};

const deleteAssignment = (id) => {
  assignments = assignments.filter((assignment) => assignment.id !== id);
  focusBlocks = focusBlocks.map((block) =>
    block.assignmentId === id
      ? { ...block, assignmentId: "", assignmentTitle: "" }
      : block
  );
  nexusRuns = nexusRuns.map((run) =>
    run.appliedAssignmentId === id
      ? { ...run, appliedAssignmentId: "", appliedBlockIds: [] }
      : run
  );
  saveAssignments(assignments);
  saveBlocks(focusBlocks);
  saveNexusRuns(nexusRuns);
  renderAll();
};

focusForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = focusForm.title.value.trim() || "Focus Block";
  const date = focusForm.date.value;
  const time = focusForm.time.value;
  const duration = focusForm.duration.value;
  const priority = focusForm.priority.value;
  const notes = focusForm.notes.value.trim();
  const assignmentId = focusAssignment?.value || "";
  const assignmentMatch = assignments.find(
    (assignment) => assignment.id === assignmentId
  );
  const completed = focusCompleted ? focusCompleted.checked : false;

  const block = {
    id: focusIdField?.value || crypto.randomUUID?.() || String(Date.now()),
    title,
    date,
    time: time || formatTime(new Date()),
    duration,
    priority,
    notes,
    assignmentId,
    assignmentTitle: assignmentMatch ? assignmentMatch.title : "",
    completed,
    createdAt: Date.now(),
  };

  const existingIndex = focusBlocks.findIndex((item) => item.id === block.id);
  if (existingIndex >= 0) {
    focusBlocks[existingIndex] = { ...focusBlocks[existingIndex], ...block };
  } else {
    focusBlocks.unshift(block);
  }

  saveBlocks(focusBlocks);
  renderAll();

  focusStatus.textContent = notes
    ? "Focus block added with notes."
    : "Focus block added.";
  focusForm.reset();
  closeModal();
});

assignmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = assignmentForm.title.value.trim();
  const due = assignmentForm.due.value;
  const hours = assignmentForm.hours.value;
  const turnIn = assignmentTurnIn ? assignmentTurnIn.value : "online";

  const assignment = {
    id: assignmentIdField?.value || crypto.randomUUID?.() || String(Date.now()),
    title,
    due,
    hours,
    turnIn,
    createdAt: Date.now(),
  };

  const existingIndex = assignments.findIndex(
    (item) => item.id === assignment.id
  );
  if (existingIndex >= 0) {
    assignments[existingIndex] = { ...assignments[existingIndex], ...assignment };
  } else {
    assignments.unshift(assignment);
  }

  focusBlocks = focusBlocks.map((block) =>
    block.assignmentId === assignment.id
      ? { ...block, assignmentTitle: assignment.title }
      : block
  );

  saveAssignments(assignments);
  saveBlocks(focusBlocks);
  renderAll();

  assignmentStatus.textContent = "Assignment saved.";
  assignmentForm.reset();
  closeAssignmentModal();

  if (focusAssignment) {
    focusAssignment.value = assignment.id;
  }
});

nexusClearButton?.addEventListener("click", () => {
  if (nexusForm) {
    nexusForm.reset();
  }
  if (nexusStatus) {
    nexusStatus.textContent = "Nexus intake cleared.";
  }
});

nexusForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const source = nexusSource?.value || "assignment";
  const text = (nexusText?.value || "").trim();
  if (!text) {
    if (nexusStatus) {
      nexusStatus.textContent = "Paste some intake text first.";
    }
    return;
  }

  const suggestion = createNexusSuggestion(source, text);
  nexusRuns.unshift(suggestion);
  nexusRuns = nexusRuns.slice(0, 20);
  saveNexusRuns(nexusRuns);
  renderAll();

  if (nexusStatus) {
    nexusStatus.textContent =
      aiSettings.enabled && aiSettings.apiKey
        ? "Nexus Prep ran in AI-ready mode (local fallback parser currently active)."
        : "Nexus Prep ran in local parser mode. Add an API key later to enable live AI.";
  }
});

aiSettingsClearButton?.addEventListener("click", () => {
  aiSettings = {
    provider: "openai",
    model: "gpt-4.1-mini",
    apiKey: "",
    enabled: false,
  };
  saveAiSettings(aiSettings);
  renderAll();
});

aiSettingsForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  aiSettings = {
    provider: aiProvider?.value || "openai",
    model: aiModel?.value.trim() || "gpt-4.1-mini",
    apiKey: aiApiKey?.value.trim() || "",
    enabled: Boolean(aiKeyEnabled?.checked),
  };

  saveAiSettings(aiSettings);
  renderAll();

  if (aiSettingsStatus) {
    aiSettingsStatus.textContent = aiSettings.apiKey
      ? `Settings saved · ${maskKey(aiSettings.apiKey)}`
      : "Settings saved · no API key configured";
  }
});

renderAll();
