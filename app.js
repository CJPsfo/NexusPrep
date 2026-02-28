const highlight = document.querySelector(".highlight");
const syncButton = document.querySelector('[data-action="sync"]');
const focusButton = document.querySelector('[data-action="focus"]');
const assignmentButtons = document.querySelectorAll('[data-action="assignment"]');
const lastSync = document.querySelector("#last-sync");
const syncStatus = document.querySelector("#sync-status");
const intakeList = document.querySelector("#intake-list");
const quickCaptureForm = document.querySelector("#quick-capture-form");
const quickCaptureInput = document.querySelector("#quick-capture-input");
const quickCaptureClearButton = document.querySelector("#quick-capture-clear");
const quickCaptureStatus = document.querySelector("#quick-capture-status");
const timeline = document.querySelector("#timeline");
const planner = document.querySelector(".planner");
const blockList = document.querySelector("#block-list");
const assignmentList = document.querySelector("#assignment-list");
const assignmentSearch = document.querySelector("#assignment-search");
const assignmentCourseFilter = document.querySelector("#assignment-filter-course");
const assignmentStatusFilter = document.querySelector("#assignment-filter-status");
const alertList = document.querySelector("#alert-list");
const priorityStack = document.querySelector("#priority-stack");
const revealItems = document.querySelectorAll(".reveal");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarTabs = document.querySelectorAll("[data-view]");
const profileName = document.querySelector("#profile-name");
const logoutButton = document.querySelector("#logout");
const themeToggle = document.querySelector("#theme-toggle");
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
const assignmentCourse = document.querySelector("#assignment-course");
const assignmentKind = document.querySelector("#assignment-kind");
const assignmentDifficulty = document.querySelector("#assignment-difficulty");
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
const nexusReadinessValue = document.querySelector("#nexus-readiness-score strong");
const nexusReadinessLabel = document.querySelector("#nexus-readiness-score span");
const courseFileForm = document.querySelector("#course-file-form");
const courseFileCourse = document.querySelector("#course-file-course");
const courseFileKind = document.querySelector("#course-file-kind");
const courseFileAssignment = document.querySelector("#course-file-assignment");
const courseFileInput = document.querySelector("#course-file-input");
const courseFileClearButton = document.querySelector("#course-file-clear");
const courseFileStatus = document.querySelector("#course-file-status");
const courseFileList = document.querySelector("#course-file-list");
const classProgressList = document.querySelector("#class-progress-list");
const classCountValue = document.querySelector("#class-count");
const classAssignmentCountValue = document.querySelector("#class-assignment-count");
const classFileCountValue = document.querySelector("#class-file-count");
const classCompletionValue = document.querySelector("#class-completion-rate");
const cadenceStatusSummary = document.querySelector("#cadence-status-summary");
const cadenceModeDisplay = document.querySelector("#cadence-mode-display");
const cadenceEndpointDisplay = document.querySelector("#cadence-endpoint-display");
const cadenceProjectDisplay = document.querySelector("#cadence-project-display");
const cadenceQueueCount = document.querySelector("#cadence-queue-count");
const cadenceLastExport = document.querySelector("#cadence-last-export");
const cadenceExportButton = document.querySelector("#cadence-export-json");
const cadenceClearButton = document.querySelector("#cadence-clear-queue");
const aiSettingsForm = document.querySelector("#ai-settings-form");
const aiProvider = document.querySelector("#ai-provider");
const aiModel = document.querySelector("#ai-model");
const aiApiKey = document.querySelector("#ai-api-key");
const aiKeyEnabled = document.querySelector("#ai-key-enabled");
const aiSettingsClearButton = document.querySelector("#ai-settings-clear");
const aiSettingsStatus = document.querySelector("#ai-settings-status");
const aiProviderDisplay = document.querySelector("#ai-provider-display");
const aiModelDisplay = document.querySelector("#ai-model-display");
const aiModeDisplay = document.querySelector("#ai-mode-display");
const aiKeySourceDisplay = document.querySelector("#ai-key-source-display");
const quizForm = document.querySelector("#quiz-form");
const quizTopic = document.querySelector("#quiz-topic");
const quizCount = document.querySelector("#quiz-count");
const quizStyle = document.querySelector("#quiz-style");
const quizClearButton = document.querySelector("#quiz-clear");
const quizStatus = document.querySelector("#quiz-status");
const quizList = document.querySelector("#quiz-list");

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
const assignmentFilterState = {
  search: "",
  course: "all",
  status: "all",
};
const STORAGE_KEY = "vertex_focus_blocks";
const ASSIGNMENT_KEY = "vertex_assignments";
const AI_SETTINGS_KEY = "vertex_ai_settings";
const NEXUS_RUNS_KEY = "vertex_nexus_runs";
const QUIZ_RUNS_KEY = "vertex_quiz_runs";
const COURSE_FILES_KEY = "vertex_course_files";
const CADENCE_QUEUE_KEY = "vertex_cadence_queue";
const THEME_KEY = "vertex_theme";

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
  const developerConfig = window.VERTEX_NEXUS_AI_CONFIG || {};
  const base = {
    provider: developerConfig.provider || "openai",
    model: developerConfig.model || "gpt-4.1-mini",
    apiKey: developerConfig.apiKey || "",
    enabled:
      typeof developerConfig.enabled === "boolean"
        ? developerConfig.enabled
        : Boolean(developerConfig.apiKey),
  };

  try {
    const raw = localStorage.getItem(AI_SETTINGS_KEY);
    return raw ? { ...base, ...JSON.parse(raw) } : base;
  } catch (error) {
    return base;
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

const loadQuizRuns = () => {
  try {
    const raw = localStorage.getItem(QUIZ_RUNS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveQuizRuns = (runs) => {
  localStorage.setItem(QUIZ_RUNS_KEY, JSON.stringify(runs));
};

let quizRuns = loadQuizRuns();

const loadCourseFiles = () => {
  try {
    const raw = localStorage.getItem(COURSE_FILES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveCourseFiles = (files) => {
  localStorage.setItem(COURSE_FILES_KEY, JSON.stringify(files));
};

let courseFiles = loadCourseFiles();

const loadCadenceQueue = () => {
  try {
    const raw = localStorage.getItem(CADENCE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

const saveCadenceQueue = (queue) => {
  localStorage.setItem(CADENCE_QUEUE_KEY, JSON.stringify(queue));
};

let cadenceQueue = loadCadenceQueue();

const loadCadenceConfig = () => {
  const developerConfig = window.VERTEX_CADENCE_CONFIG || {};
  return {
    enabled: Boolean(developerConfig.enabled),
    mode: developerConfig.mode || "queue-export",
    endpoint: developerConfig.endpoint || "",
    projectId: developerConfig.projectId || "",
  };
};

const cadenceConfig = loadCadenceConfig();

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

const formatBytes = (value) => {
  const bytes = Number(value || 0);
  if (!bytes) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB"];
  const level = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const size = bytes / 1024 ** level;
  return `${size >= 10 || level === 0 ? Math.round(size) : size.toFixed(1)} ${units[level]}`;
};

const isTextLikeFile = (file) => {
  const name = (file?.name || "").toLowerCase();
  const type = (file?.type || "").toLowerCase();
  return (
    type.startsWith("text/") ||
    type.includes("json") ||
    type.includes("xml") ||
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    name.endsWith(".csv") ||
    name.endsWith(".json")
  );
};

const inferNexusSourceFromDocKind = (kind) => {
  if (kind === "syllabus") {
    return "syllabus";
  }
  if (kind === "notes" || kind === "reading") {
    return "notes";
  }
  return "assignment";
};

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const startOfDay = (value = new Date()) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const parseDateOnly = (value) => {
  if (!value) {
    return null;
  }
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const getDueDayDelta = (dueDateValue) => {
  const dueDate = parseDateOnly(dueDateValue);
  if (!dueDate) {
    return null;
  }
  return Math.round(
    (dueDate.getTime() - startOfDay().getTime()) / (1000 * 60 * 60 * 24)
  );
};

const toBlockTimestamp = (block) => {
  if (!block?.date) {
    return Number.POSITIVE_INFINITY;
  }

  const rawTime = block.time || "23:59";
  const normalizedTime = /^\d{2}:\d{2}$/.test(rawTime)
    ? `${rawTime}:00`
    : rawTime;
  const parsed = new Date(`${block.date}T${normalizedTime}`);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.getTime();
  }
  const fallback = parseDateOnly(block.date);
  return fallback ? fallback.getTime() : Number.POSITIVE_INFINITY;
};

const sortBlocksForDisplay = (items) =>
  [...items].sort((left, right) => {
    const timeDiff = toBlockTimestamp(left) - toBlockTimestamp(right);
    if (timeDiff !== 0) {
      return timeDiff;
    }
    return String(left.title || "").localeCompare(String(right.title || ""));
  });

const buildCadencePayloadFromRun = (run) => {
  if (!run) {
    return null;
  }

  const linkedAssignment =
    assignments.find((item) => item.id === run.appliedAssignmentId) || null;
  const linkedBlocks = (run.appliedBlockIds || [])
    .map((id) => focusBlocks.find((block) => block.id === id))
    .filter(Boolean);

  const assignment = linkedAssignment || run.assignment;
  const sessionObjects = linkedBlocks.length
    ? linkedBlocks.map((block) => ({
        id: block.id,
        title: block.title,
        date: block.date,
        time: block.time,
        duration: Number(block.duration || 0),
        priority: block.priority || "medium",
        completed: Boolean(block.completed),
        assignmentId: block.assignmentId || "",
      }))
    : (run.sessions || []).map((session) => ({
        title: session.title,
        date: session.date,
        time: session.time,
        duration: Number(session.duration || 0),
        priority: session.priority || "medium",
        completed: false,
      }));

  const relatedCourseFiles = courseFiles
    .filter((file) => {
      const exactAssignmentLink =
        file.assignmentId &&
        assignment.id &&
        normalizeText(file.assignmentId) === normalizeText(assignment.id);
      const sameCourse =
        normalizeText(file.course) &&
        normalizeText(file.course) === normalizeText(assignment.course);
      const likelyRelevant =
        !normalizeText(assignment.course) &&
        ["syllabus", "assignment", "rubric", "reading", "notes"].includes(file.kind);
      return exactAssignmentLink || sameCourse || likelyRelevant;
    })
    .slice(0, 12)
    .map((file) => ({
      id: file.id,
      name: file.name,
      kind: file.kind,
      course: file.course || "",
      size: file.size || 0,
      type: file.type || "unknown",
      uploadedAt: file.uploadedAt,
      previewText: (file.textSnippet || "").slice(0, 240),
    }));

  return {
    id: crypto.randomUUID?.() || String(Date.now()),
    schemaVersion: "vertex.cadence.handoff.v1",
    sourceProduct: "nexus-prep",
    createdAt: Date.now(),
    nexusRunId: run.id,
    assignment: {
      title: assignment.title || "Untitled Assignment",
      course: assignment.course || "",
      kind: assignment.kind || "homework",
      difficulty: assignment.difficulty || "medium",
      due: assignment.due || "",
      hours: Number(assignment.hours || 0),
      turnIn: assignment.turnIn || "online",
      priority: assignment.priority || inferPriorityFromDueDate(assignment.due || ""),
    },
    scheduleCandidates: sessionObjects,
    contextFiles: relatedCourseFiles,
    diagnostics: {
      source: run.source || "assignment",
      rawIntakePreview: (run.rawText || "").slice(0, 600),
      hasLinkedVertexAssignment: Boolean(run.appliedAssignmentId),
      hasLinkedVertexBlocks: linkedBlocks.length > 0,
    },
    sync: {
      mode: cadenceConfig.mode,
      status: "queued",
      exportedAt: null,
    },
  };
};

const readFileSnippet = async (file) => {
  if (!file || !isTextLikeFile(file) || typeof file.text !== "function") {
    return { text: "", canPreview: false };
  }

  try {
    const fullText = await file.text();
    const cleaned = fullText.replace(/\s+/g, " ").trim();
    return {
      text: cleaned.slice(0, 12000),
      canPreview: true,
    };
  } catch (error) {
    return { text: "", canPreview: false };
  }
};

const applyTheme = (theme) => {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.classList.toggle("theme-dark", nextTheme === "dark");
  localStorage.setItem(THEME_KEY, nextTheme);
  if (themeToggle) {
    themeToggle.textContent = nextTheme === "dark" ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  }
};

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
};

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

const parseCourseFromText = (text) => {
  const coursePatterns = [
    /AP\s+[A-Za-z ]+/,
    /(Organic Chemistry|Biology|Chemistry|Physics|Calculus|History|English|Statistics)/i,
  ];

  for (const pattern of coursePatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }

  return "";
};

const parseAssignmentKind = (text, source) => {
  if (/quiz/i.test(text)) {
    return "quiz";
  }
  if (/(exam|test)/i.test(text) || source === "exam") {
    return "exam";
  }
  if (/essay/i.test(text)) {
    return "essay";
  }
  if (/lab/i.test(text)) {
    return "lab";
  }
  if (/project/i.test(text)) {
    return "project";
  }
  return "homework";
};

const parseDifficulty = (text) => {
  if (/(very hard|hard|difficult|advanced)/i.test(text)) {
    return "hard";
  }
  if (/(easy|simple|review)/i.test(text)) {
    return "easy";
  }
  return "medium";
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

const buildSuggestedSessions = (
  hours,
  dueDate,
  priority,
  assignmentTitle,
  difficulty = "medium"
) => {
  const difficultyMultiplier =
    difficulty === "hard" ? 1.25 : difficulty === "easy" ? 0.8 : 1;
  const totalMinutes = Math.max(
    60,
    Math.round(Number(hours || 1) * 60 * difficultyMultiplier)
  );
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
  const course = parseCourseFromText(text);
  const kind = parseAssignmentKind(text, source);
  const difficulty = parseDifficulty(text);
  const title = parseTitleFromText(text, source);
  const priority = inferPriorityFromDueDate(due);
  const sessions = buildSuggestedSessions(hours, due, priority, title, difficulty);

  return {
    id: crypto.randomUUID?.() || String(Date.now()),
    source,
    rawText: text,
    createdAt: Date.now(),
    assignment: {
      title,
      due: due || new Date().toISOString().slice(0, 10),
      hours,
      course,
      kind,
      difficulty,
      turnIn,
      priority,
    },
    sessions,
    appliedAssignmentId: "",
    appliedBlockIds: [],
    cadenceQueueId: "",
    cadenceQueuedAt: 0,
  };
};

const quizTemplates = {
  "multiple-choice": [
    (topic, index) => ({
      type: "MC",
      question: `Which statement best describes ${topic} concept ${index + 1}?`,
      answer: "Review your notes and identify the most accurate definition.",
    }),
    (topic, index) => ({
      type: "MC",
      question: `Which example is the strongest application of ${topic}?`,
      answer: "Choose the option that matches the core mechanism, not surface details.",
    }),
  ],
  "short-answer": [
    (topic, index) => ({
      type: "SA",
      question: `Explain ${topic} in your own words (prompt ${index + 1}).`,
      answer: "Define it, name the key steps/components, and give one example.",
    }),
    (topic, index) => ({
      type: "SA",
      question: `What is one common mistake students make with ${topic}?`,
      answer: "Identify the misconception and correct it with the proper rule or process.",
    }),
  ],
};

const generateQuizQuestions = (topic, count, style) => {
  const normalizedTopic = topic.trim() || "this topic";
  const modes =
    style === "mixed"
      ? ["multiple-choice", "short-answer"]
      : [style || "mixed"];

  return Array.from({ length: count }, (_, index) => {
    const mode = modes[index % modes.length];
    const templates = quizTemplates[mode] || quizTemplates["short-answer"];
    const template = templates[index % templates.length];
    return {
      id: crypto.randomUUID?.() || String(Date.now() + index),
      ...template(normalizedTopic, index),
    };
  });
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
    if (assignmentCourse) {
      assignmentCourse.value = assignment.course || "";
    }
    if (assignmentKind) {
      assignmentKind.value = assignment.kind || "homework";
    }
    if (assignmentDifficulty) {
      assignmentDifficulty.value = assignment.difficulty || "medium";
    }
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
    if (assignmentCourse) {
      assignmentCourse.value = "";
    }
    if (assignmentKind) {
      assignmentKind.value = "homework";
    }
    if (assignmentDifficulty) {
      assignmentDifficulty.value = "medium";
    }
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

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("theme-dark");
  applyTheme(isDark ? "light" : "dark");
});

setTimeout(() => {
  highlight?.classList.add("pulse");
}, 500);

initTheme();
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
  const orderedBlocks = sortBlocksForDisplay(focusBlocks);
  if (!orderedBlocks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No focus blocks yet.";
    timeline.appendChild(empty);
    return;
  }

  orderedBlocks.forEach((item) => {
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
  const orderedBlocks = sortBlocksForDisplay(focusBlocks);
  if (!orderedBlocks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No focus blocks scheduled yet.";
    planner.appendChild(empty);
    return;
  }

  orderedBlocks.forEach((item) => {
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
  const orderedBlocks = sortBlocksForDisplay(focusBlocks);
  if (!orderedBlocks.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No focus blocks scheduled yet.";
    blockList.appendChild(empty);
    return;
  }

  orderedBlocks.forEach((item) => {
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
    // still populate other assignment selectors on pages without a focus modal
  } else {
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
  }

  if (courseFileAssignment) {
    const currentValue = courseFileAssignment.value || "";
    courseFileAssignment.innerHTML = "";

    const noLinkOption = document.createElement("option");
    noLinkOption.value = "";
    noLinkOption.textContent = "No assignment link";
    courseFileAssignment.appendChild(noLinkOption);

    assignments.forEach((assignment) => {
      const option = document.createElement("option");
      option.value = assignment.id;
      option.textContent = `${
        assignment.course ? `${assignment.course} · ` : ""
      }${assignment.title}`;
      courseFileAssignment.appendChild(option);
    });

    if (currentValue && assignments.some((assignment) => assignment.id === currentValue)) {
      courseFileAssignment.value = currentValue;
    }
  }
};

const getAssignmentProgressMetrics = (assignmentId) => {
  const linkedBlocks = focusBlocks.filter((block) => block.assignmentId === assignmentId);
  const totalMinutes = linkedBlocks.reduce(
    (sum, block) => sum + Number(block.duration || 0),
    0
  );
  const completedMinutes = linkedBlocks
    .filter((block) => block.completed)
    .reduce((sum, block) => sum + Number(block.duration || 0), 0);

  return {
    totalMinutes,
    completedMinutes,
  };
};

const listKnownCourses = () => {
  const courses = new Set();
  assignments.forEach((assignment) => {
    const course = (assignment.course || "").trim();
    if (course) {
      courses.add(course);
    }
  });
  courseFiles.forEach((file) => {
    const course = (file.course || "").trim();
    if (course) {
      courses.add(course);
    }
  });
  return [...courses].sort((left, right) => left.localeCompare(right));
};

const renderCourseAutocomplete = () => {
  const courseInputs = [assignmentCourse, courseFileCourse].filter(Boolean);
  if (!courseInputs.length) {
    return;
  }

  let datalist = document.querySelector("#course-options");
  if (!datalist) {
    datalist = document.createElement("datalist");
    datalist.id = "course-options";
    document.body.appendChild(datalist);
  }

  datalist.innerHTML = "";
  listKnownCourses().forEach((course) => {
    const option = document.createElement("option");
    option.value = course;
    datalist.appendChild(option);
  });

  courseInputs.forEach((input) => {
    input.setAttribute("list", "course-options");
  });
};

const buildAssignmentSnapshot = (assignment) => {
  const { totalMinutes, completedMinutes } = getAssignmentProgressMetrics(assignment.id);
  const estimatedMinutes = Number(assignment.hours || 0) * 60;
  const completionPct =
    estimatedMinutes > 0
      ? Math.min(100, Math.round((completedMinutes / estimatedMinutes) * 100))
      : 0;
  const dueDelta = getDueDayDelta(assignment.due);
  const isCompleted = completionPct >= 100 && estimatedMinutes > 0;
  const isOverdue = dueDelta !== null && dueDelta < 0 && !isCompleted;
  const isDueSoon = dueDelta !== null && dueDelta >= 0 && dueDelta <= 3 && !isCompleted;
  const isUnscheduled = totalMinutes === 0;

  return {
    assignment,
    totalMinutes,
    completedMinutes,
    estimatedMinutes,
    completionPct,
    dueDelta,
    isCompleted,
    isOverdue,
    isDueSoon,
    isUnscheduled,
  };
};

const getFilteredAssignmentSnapshots = () => {
  const courseFilter = assignmentFilterState.course;
  const search = normalizeText(assignmentFilterState.search);
  const statusFilter = assignmentFilterState.status;

  return assignments
    .map((assignment) => buildAssignmentSnapshot(assignment))
    .filter((snapshot) => {
      if (courseFilter !== "all") {
        const courseKey = normalizeText(snapshot.assignment.course);
        if (courseKey !== courseFilter) {
          return false;
        }
      }

      if (search) {
        const haystack = normalizeText(
          `${snapshot.assignment.title} ${snapshot.assignment.course}`
        );
        if (!haystack.includes(search)) {
          return false;
        }
      }

      if (statusFilter === "open" && snapshot.isCompleted) {
        return false;
      }
      if (statusFilter === "due-soon" && !snapshot.isDueSoon) {
        return false;
      }
      if (statusFilter === "overdue" && !snapshot.isOverdue) {
        return false;
      }
      if (statusFilter === "completed" && !snapshot.isCompleted) {
        return false;
      }

      return true;
    })
    .sort((left, right) => {
      if (left.isOverdue !== right.isOverdue) {
        return left.isOverdue ? -1 : 1;
      }
      if (left.isDueSoon !== right.isDueSoon) {
        return left.isDueSoon ? -1 : 1;
      }
      if (left.isCompleted !== right.isCompleted) {
        return left.isCompleted ? 1 : -1;
      }
      const leftDue = left.dueDelta ?? Number.POSITIVE_INFINITY;
      const rightDue = right.dueDelta ?? Number.POSITIVE_INFINITY;
      if (leftDue !== rightDue) {
        return leftDue - rightDue;
      }
      return left.assignment.title.localeCompare(right.assignment.title);
    });
};

const renderAssignmentFilters = () => {
  if (!assignmentCourseFilter) {
    return;
  }

  const selectedCourse = assignmentFilterState.course;
  assignmentCourseFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Classes";
  assignmentCourseFilter.appendChild(allOption);

  listKnownCourses().forEach((course) => {
    const option = document.createElement("option");
    option.value = normalizeText(course);
    option.textContent = course;
    assignmentCourseFilter.appendChild(option);
  });

  const hasSelectedCourse = Array.from(assignmentCourseFilter.options).some(
    (option) => option.value === selectedCourse
  );
  assignmentCourseFilter.value = hasSelectedCourse ? selectedCourse : "all";
  assignmentFilterState.course = assignmentCourseFilter.value;

  if (assignmentStatusFilter) {
    assignmentStatusFilter.value = assignmentFilterState.status;
  }

  if (assignmentSearch) {
    assignmentSearch.value = assignmentFilterState.search;
  }
};

const renderAssignmentList = () => {
  if (!assignmentList) {
    return;
  }

  renderAssignmentFilters();
  assignmentList.innerHTML = "";

  if (!assignments.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No assignments yet.";
    assignmentList.appendChild(empty);
    return;
  }

  const snapshots = getFilteredAssignmentSnapshots();
  if (!snapshots.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No assignments match the current filters.";
    assignmentList.appendChild(empty);
    return;
  }

  snapshots.forEach((snapshot) => {
    const { assignment, totalMinutes, completedMinutes, completionPct, dueDelta } =
      snapshot;

    const card = document.createElement("div");
    card.className = "assignment-card";
    if (snapshot.isCompleted && totalMinutes > 0) {
      card.classList.add("is-complete");
    }

    const title = document.createElement("h4");
    title.textContent = assignment.title;

    const meta = document.createElement("div");
    meta.className = "assignment-meta";
    let dueLabel = "No due date";
    if (typeof dueDelta === "number") {
      if (dueDelta < 0) {
        dueLabel = `${Math.abs(dueDelta)} day(s) overdue`;
      } else if (dueDelta === 0) {
        dueLabel = "Due today";
      } else {
        dueLabel = `Due in ${dueDelta} day(s)`;
      }
    }
    const turnInLabel =
      assignment.turnIn === "physical" ? "Physical" : "Online";
    const kindLabel = assignment.kind || "homework";
    const difficultyLabel = assignment.difficulty || "medium";
    meta.textContent = `${assignment.course ? `${assignment.course} · ` : ""}${kindLabel} · ${difficultyLabel} · ${dueLabel} · Est ${assignment.hours}h · ${turnInLabel} turn-in · Scheduled ${Math.round(
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

const renderPriorityStack = () => {
  if (!priorityStack) {
    return;
  }

  priorityStack.innerHTML = "";
  if (!assignments.length) {
    const empty = document.createElement("span");
    empty.textContent = "No priorities yet";
    priorityStack.appendChild(empty);
    return;
  }

  const topPriority = assignments
    .map((assignment) => buildAssignmentSnapshot(assignment))
    .sort((left, right) => {
      if (left.isOverdue !== right.isOverdue) {
        return left.isOverdue ? -1 : 1;
      }
      if (left.isDueSoon !== right.isDueSoon) {
        return left.isDueSoon ? -1 : 1;
      }
      return right.completionPct - left.completionPct;
    })
    .slice(0, 5);

  topPriority.forEach((snapshot) => {
    const chip = document.createElement("span");
    const prefix = snapshot.isOverdue
      ? "Overdue"
      : snapshot.isDueSoon
      ? "Due soon"
      : snapshot.assignment.priority || "Priority";
    chip.textContent = `${prefix}: ${snapshot.assignment.title}`;
    priorityStack.appendChild(chip);
  });
};

const renderAlerts = () => {
  if (!alertList) {
    return;
  }

  alertList.innerHTML = "";
  const snapshots = assignments
    .map((assignment) => buildAssignmentSnapshot(assignment))
    .sort((left, right) => {
      const leftDue = left.dueDelta ?? Number.POSITIVE_INFINITY;
      const rightDue = right.dueDelta ?? Number.POSITIVE_INFINITY;
      return leftDue - rightDue;
    });

  const alerts = [];
  snapshots.forEach((snapshot) => {
    if (snapshot.isOverdue) {
      alerts.push({
        level: "critical",
        title: snapshot.assignment.title,
        detail: `${Math.abs(snapshot.dueDelta || 0)} day(s) overdue`,
        note: "Add a recovery focus block today.",
      });
      return;
    }

    if (snapshot.isDueSoon) {
      alerts.push({
        level: "warning",
        title: snapshot.assignment.title,
        detail:
          snapshot.dueDelta === 0
            ? "Due today"
            : `Due in ${snapshot.dueDelta} day(s)`,
        note:
          snapshot.totalMinutes === 0
            ? "No focus time scheduled yet."
            : `${Math.round(snapshot.totalMinutes)}m scheduled so far.`,
      });
      return;
    }

    if (snapshot.isUnscheduled && !snapshot.isCompleted) {
      alerts.push({
        level: "warning",
        title: snapshot.assignment.title,
        detail: "No focus blocks scheduled",
        note: "Open assignment and add a block.",
      });
    }
  });

  const unlinkedFiles = courseFiles.filter(
    (file) => !file.assignmentId && file.kind !== "syllabus"
  );
  if (unlinkedFiles.length) {
    alerts.push({
      level: "warning",
      title: "Course files need linking",
      detail: `${unlinkedFiles.length} file(s) not linked to assignments`,
      note: "Link files in Nexus Prep for better organization.",
    });
  }

  if (!alerts.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No active alerts. You are on track.";
    alertList.appendChild(empty);
    return;
  }

  alerts.slice(0, 8).forEach((alert) => {
    const item = document.createElement("div");
    item.className = `alert-item ${alert.level}`;

    const title = document.createElement("strong");
    title.textContent = alert.title;

    const meta = document.createElement("div");
    meta.className = "alert-meta";
    meta.textContent = alert.detail;

    const note = document.createElement("p");
    note.className = "nexus-preview";
    note.textContent = alert.note;

    item.append(title, meta, note);
    alertList.appendChild(item);
  });
};

const renderAiSettings = () => {
  if (aiSettingsForm) {
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
  }

  if (aiProviderDisplay) {
    aiProviderDisplay.textContent = (aiSettings.provider || "openai").toUpperCase();
  }
  if (aiModelDisplay) {
    aiModelDisplay.textContent = aiSettings.model || "gpt-4.1-mini";
  }
  if (aiModeDisplay) {
    aiModeDisplay.textContent =
      aiSettings.enabled && aiSettings.apiKey
        ? "Developer AI mode enabled"
        : "Local fallback active";
  }
  if (aiKeySourceDisplay) {
    aiKeySourceDisplay.textContent = aiSettings.apiKey
      ? `Developer key detected (${maskKey(aiSettings.apiKey)})`
      : "No developer key detected";
  }

  if (aiSettingsStatus) {
    const enabledLabel =
      aiSettings.enabled && aiSettings.apiKey
        ? "API mode ready"
        : "Local prep mode (no live API calls)";
    aiSettingsStatus.textContent = `${enabledLabel} · ${maskKey(aiSettings.apiKey)}`;
  }
};

const stageNexusSuggestionForCadence = (runId) => {
  const runIndex = nexusRuns.findIndex((run) => run.id === runId);
  if (runIndex < 0) {
    return;
  }

  const payload = buildCadencePayloadFromRun(nexusRuns[runIndex]);
  if (!payload) {
    return;
  }

  const existingIndex = cadenceQueue.findIndex(
    (item) => item.nexusRunId === payload.nexusRunId
  );

  if (existingIndex >= 0) {
    cadenceQueue[existingIndex] = {
      ...cadenceQueue[existingIndex],
      ...payload,
      id: cadenceQueue[existingIndex].id,
      updatedAt: Date.now(),
    };
    payload.id = cadenceQueue[existingIndex].id;
  } else {
    cadenceQueue.unshift(payload);
  }

  cadenceQueue = cadenceQueue.slice(0, 50);
  saveCadenceQueue(cadenceQueue);

  nexusRuns[runIndex] = {
    ...nexusRuns[runIndex],
    cadenceQueueId: payload.id,
    cadenceQueuedAt: Date.now(),
  };
  saveNexusRuns(nexusRuns);
  renderAll();

  if (nexusStatus) {
    nexusStatus.textContent = cadenceConfig.enabled && cadenceConfig.endpoint
      ? "Cadence handoff package staged. Endpoint integration can send this payload later."
      : "Cadence handoff package queued locally (JSON export ready).";
  }
};

const clearCadenceQueue = () => {
  cadenceQueue = [];
  saveCadenceQueue(cadenceQueue);
  nexusRuns = nexusRuns.map((run) => ({
    ...run,
    cadenceQueueId: "",
    cadenceQueuedAt: 0,
  }));
  saveNexusRuns(nexusRuns);
  renderAll();
};

const exportCadenceQueueAsJson = () => {
  const payload = {
    exportedAt: new Date().toISOString(),
    schemaVersion: "vertex.cadence.export-batch.v1",
    count: cadenceQueue.length,
    items: cadenceQueue,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().replaceAll(":", "-");
  link.href = url;
  link.download = `vertex-cadence-handoff-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);

  cadenceQueue = cadenceQueue.map((item) => ({
    ...item,
    sync: {
      ...(item.sync || {}),
      status: "exported",
      exportedAt: Date.now(),
    },
  }));
  saveCadenceQueue(cadenceQueue);
  renderAll();
};

const renderCadenceIntegration = () => {
  if (cadenceModeDisplay) {
    cadenceModeDisplay.textContent = cadenceConfig.enabled
      ? "Cadence integration enabled"
      : "Cadence handoff disabled (queue/export mode)";
  }

  if (cadenceEndpointDisplay) {
    cadenceEndpointDisplay.textContent = cadenceConfig.endpoint || "No endpoint configured";
  }

  if (cadenceProjectDisplay) {
    cadenceProjectDisplay.textContent = cadenceConfig.projectId || "No project id";
  }

  if (cadenceQueueCount) {
    cadenceQueueCount.textContent = String(cadenceQueue.length);
  }

  if (cadenceLastExport) {
    const latest = cadenceQueue
      .map((item) => item?.sync?.exportedAt)
      .filter(Boolean)
      .sort((a, b) => b - a)[0];
    cadenceLastExport.textContent = latest
      ? new Date(latest).toLocaleString()
      : "Not exported yet";
  }

  if (cadenceStatusSummary) {
    cadenceStatusSummary.textContent = cadenceQueue.length
      ? `${cadenceQueue.length} handoff package(s) queued for future Cadence sync`
      : "No queued Cadence handoff packages yet";
  }

  if (cadenceExportButton) {
    cadenceExportButton.disabled = cadenceQueue.length === 0;
  }

  if (cadenceClearButton) {
    cadenceClearButton.disabled = cadenceQueue.length === 0;
  }
};

const prefillNexusFromCourseFile = (record) => {
  if (!record) {
    return;
  }

  if (nexusSource) {
    nexusSource.value = inferNexusSourceFromDocKind(record.kind);
  }

  if (nexusText) {
    const summaryLines = [
      `Course: ${record.course || "General"}`,
      `Document type: ${record.kind || "other"}`,
      `File: ${record.name}`,
    ];
    if (record.textSnippet) {
      summaryLines.push("", record.textSnippet);
    } else {
      summaryLines.push(
        "",
        "No text preview available for this file type yet. Paste key sections here or add PDF/DOCX parsing next."
      );
    }
    nexusText.value = summaryLines.join("\n");
  }

  if (nexusStatus) {
    nexusStatus.textContent = `Loaded "${record.name}" into Nexus intake. Review and click Run Nexus Prep.`;
  }

  if (typeof nexusText?.focus === "function") {
    nexusText.focus();
  }
};

const deleteCourseFile = (id) => {
  courseFiles = courseFiles.filter((file) => file.id !== id);
  saveCourseFiles(courseFiles);
  renderAll();
};

const renderCourseFiles = () => {
  if (!courseFileList) {
    return;
  }

  courseFileList.innerHTML = "";

  if (!courseFiles.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No course files yet. Upload syllabi, assignment sheets, or rubrics.";
    courseFileList.appendChild(empty);
    return;
  }

  courseFiles.forEach((record) => {
    const item = document.createElement("div");
    item.className = "nexus-item";

    const title = document.createElement("strong");
    title.textContent = record.name;

    const meta = document.createElement("div");
    meta.className = "block-meta";
    meta.textContent = `${record.course || "General"} · ${record.kind || "other"} · ${
      record.type || "unknown"
    } · ${formatBytes(record.size)} · ${new Date(record.uploadedAt).toLocaleString()}${
      record.assignmentTitle ? ` · Linked: ${record.assignmentTitle}` : ""
    }`;

    const preview = document.createElement("p");
    preview.className = "nexus-preview";
    preview.textContent = record.textSnippet
      ? record.textSnippet.slice(0, 220)
      : "Metadata saved. Text preview is not available for this file type yet.";

    const linkRow = document.createElement("div");
    linkRow.className = "assignment-row";

    const linkSelect = document.createElement("select");
    linkSelect.className = "inline-select";
    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "No linked assignment";
    linkSelect.appendChild(emptyOption);

    assignments.forEach((assignment) => {
      const option = document.createElement("option");
      option.value = assignment.id;
      option.textContent = `${assignment.course ? `${assignment.course} · ` : ""}${
        assignment.title
      }`;
      linkSelect.appendChild(option);
    });

    linkSelect.value =
      record.assignmentId &&
      assignments.some((assignment) => assignment.id === record.assignmentId)
        ? record.assignmentId
        : "";

    const linkButton = document.createElement("button");
    linkButton.type = "button";
    linkButton.textContent = "Save Link";
    linkButton.addEventListener("click", () => {
      const nextAssignmentId = linkSelect.value || "";
      const nextAssignment = assignments.find(
        (assignment) => assignment.id === nextAssignmentId
      );

      courseFiles = courseFiles.map((file) =>
        file.id === record.id
          ? {
              ...file,
              assignmentId: nextAssignmentId,
              assignmentTitle: nextAssignment ? nextAssignment.title : "",
              course: file.course || nextAssignment?.course || "",
            }
          : file
      );
      saveCourseFiles(courseFiles);
      renderAll();

      if (courseFileStatus) {
        courseFileStatus.textContent = nextAssignment
          ? `Linked "${record.name}" to "${nextAssignment.title}".`
          : `Removed assignment link from "${record.name}".`;
      }
    });

    linkRow.append(linkSelect, linkButton);

    const actions = document.createElement("div");
    actions.className = "block-actions";

    const useButton = document.createElement("button");
    useButton.type = "button";
    useButton.className = "primary";
    useButton.textContent = "Use in Nexus";
    useButton.addEventListener("click", () => prefillNexusFromCourseFile(record));

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Delete";
    removeButton.addEventListener("click", () => deleteCourseFile(record.id));

    actions.append(useButton, removeButton);
    item.append(title, meta, preview, linkRow, actions);
    courseFileList.appendChild(item);
  });
};

const renderClassProgress = () => {
  if (!classProgressList) {
    return;
  }

  const classMap = new Map();
  const getClassKey = (name) => normalizeText(name) || "__uncategorized";
  const getClassLabel = (name) => String(name || "").trim() || "Uncategorized";

  const ensureClass = (name) => {
    const key = getClassKey(name);
    if (!classMap.has(key)) {
      classMap.set(key, {
        key,
        name: getClassLabel(name),
        assignments: [],
        files: [],
      });
    }
    return classMap.get(key);
  };

  courseFiles.forEach((file) => {
    ensureClass(file.course).files.push(file);
  });

  assignments.forEach((assignment) => {
    ensureClass(assignment.course).assignments.push(assignment);
  });

  const classes = [...classMap.values()].map((group) => {
    let estimatedMinutes = 0;
    let scheduledMinutes = 0;
    let completedMinutes = 0;
    let completedAssignments = 0;
    let dueSoon = 0;

    group.assignments.forEach((assignment) => {
      const { totalMinutes, completedMinutes: assignmentCompletedMinutes } =
        getAssignmentProgressMetrics(assignment.id);
      const estimated = Number(assignment.hours || 0) * 60;
      estimatedMinutes += estimated;
      scheduledMinutes += totalMinutes;
      completedMinutes += assignmentCompletedMinutes;

      if (estimated > 0 && assignmentCompletedMinutes >= estimated) {
        completedAssignments += 1;
      }

      if (assignment.due) {
        const dueDate = new Date(assignment.due);
        if (!Number.isNaN(dueDate.getTime())) {
          const daysUntilDue = Math.ceil(
            (dueDate - new Date()) / (1000 * 60 * 60 * 24)
          );
          if (daysUntilDue >= 0 && daysUntilDue <= 7) {
            dueSoon += 1;
          }
        }
      }
    });

    const progressPct =
      estimatedMinutes > 0
        ? Math.min(100, Math.round((completedMinutes / estimatedMinutes) * 100))
        : 0;

    return {
      ...group,
      estimatedMinutes,
      scheduledMinutes,
      completedMinutes,
      completedAssignments,
      dueSoon,
      progressPct,
      linkedFiles: group.files.filter((file) => file.assignmentId).length,
    };
  });

  classes.sort((a, b) => {
    if (b.dueSoon !== a.dueSoon) {
      return b.dueSoon - a.dueSoon;
    }
    if (a.progressPct !== b.progressPct) {
      return a.progressPct - b.progressPct;
    }
    return a.name.localeCompare(b.name);
  });

  const totalAssignments = classes.reduce(
    (sum, group) => sum + group.assignments.length,
    0
  );
  const totalFiles = classes.reduce((sum, group) => sum + group.files.length, 0);
  const totalEstimatedMinutes = classes.reduce(
    (sum, group) => sum + group.estimatedMinutes,
    0
  );
  const totalCompletedMinutes = classes.reduce(
    (sum, group) => sum + group.completedMinutes,
    0
  );
  const overallCompletion =
    totalEstimatedMinutes > 0
      ? Math.min(100, Math.round((totalCompletedMinutes / totalEstimatedMinutes) * 100))
      : 0;

  if (classCountValue) {
    classCountValue.textContent = String(classes.length);
  }
  if (classAssignmentCountValue) {
    classAssignmentCountValue.textContent = String(totalAssignments);
  }
  if (classFileCountValue) {
    classFileCountValue.textContent = String(totalFiles);
  }
  if (classCompletionValue) {
    classCompletionValue.textContent = `${overallCompletion}%`;
  }

  classProgressList.innerHTML = "";

  if (!classes.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent =
      "No classes tracked yet. Upload a syllabus or add an assignment with a course name in Nexus Prep.";
    classProgressList.appendChild(empty);
    return;
  }

  classes.forEach((group) => {
    const card = document.createElement("div");
    card.className = "class-card";

    const title = document.createElement("h4");
    title.textContent = group.name;

    const meta = document.createElement("div");
    meta.className = "class-meta";
    meta.textContent = `${group.assignments.length} assignment(s) · ${group.files.length} file(s)${
      group.dueSoon ? ` · ${group.dueSoon} due soon` : ""
    }`;

    const progress = document.createElement("div");
    progress.className = "class-progress";

    const progressRow = document.createElement("div");
    progressRow.className = "class-progress-row";
    progressRow.innerHTML = `
      <span>${Math.round(group.completedMinutes)}m complete / ${Math.round(
        group.estimatedMinutes
      )}m estimated</span>
      <strong>${group.progressPct}%</strong>
    `;

    const progressTrack = document.createElement("div");
    progressTrack.className = "class-progress-track";
    const progressFill = document.createElement("div");
    progressFill.className = "class-progress-fill";
    progressFill.style.width = `${group.progressPct}%`;
    progressTrack.appendChild(progressFill);

    progress.append(progressRow, progressTrack);

    const chips = document.createElement("div");
    chips.className = "class-chip-row";
    const scheduledChip = document.createElement("span");
    scheduledChip.className = "class-chip";
    scheduledChip.textContent = `${Math.round(group.scheduledMinutes)}m scheduled`;
    const completedChip = document.createElement("span");
    completedChip.className = "class-chip";
    completedChip.textContent = `${group.completedAssignments}/${group.assignments.length} assignments at target`;
    const filesChip = document.createElement("span");
    filesChip.className = "class-chip";
    filesChip.textContent = `${group.linkedFiles}/${group.files.length} files linked`;
    chips.append(scheduledChip, completedChip, filesChip);

    card.append(title, meta, progress, chips);
    classProgressList.appendChild(card);
  });
};

const renderNexusSignals = () => {
  if (nexusReadinessValue && nexusReadinessLabel) {
    const totalBlocks = focusBlocks.length;
    const completedBlocks = focusBlocks.filter((block) => block.completed).length;
    const completionRatio = totalBlocks ? completedBlocks / totalBlocks : 0;
    const hardAssignments = assignments.filter(
      (assignment) => assignment.difficulty === "hard"
    );
    const hardIncomplete = hardAssignments.filter((assignment) => {
      const linked = focusBlocks.filter((block) => block.assignmentId === assignment.id);
      if (!linked.length) {
        return true;
      }
      return linked.some((block) => !block.completed);
    }).length;
    const recentQuizCount = quizRuns.length;

    const readiness = Math.max(
      25,
      Math.min(
        99,
        Math.round(45 + completionRatio * 35 + recentQuizCount * 3 - hardIncomplete * 4)
      )
    );

    nexusReadinessValue.textContent = `${readiness}%`;
    nexusReadinessLabel.textContent =
      readiness >= 85
        ? "Assessment-ready trend"
        : readiness >= 65
        ? "Progressing, focus gaps remain"
        : "Early-stage prep, prioritize gap closure";
  }

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

  const gapCandidates = [];
  assignments.forEach((assignment) => {
    if (assignment.difficulty === "hard") {
      gapCandidates.push({
        title: assignment.title,
        course: assignment.course || "General",
        reason: "Hard difficulty",
      });
    }
  });

  nexusRuns.forEach((run) => {
    if (run.assignment.difficulty === "hard") {
      gapCandidates.push({
        title: run.assignment.title,
        course: run.assignment.course || "General",
        reason: "Detected from intake",
      });
    }
  });

  const uniqueGaps = [];
  const seen = new Set();
  gapCandidates.forEach((gap) => {
    const key = `${gap.course}:${gap.title}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueGaps.push(gap);
    }
  });

  uniqueGaps.slice(0, 6).forEach((run) => {
    const item = document.createElement("div");
    item.className = "nexus-item";
    item.innerHTML = `
      <strong>${escapeHtml(run.title)}</strong>
      <div class="block-meta">
        <span>${escapeHtml(run.course || "General")}</span>
        <span>Knowledge gap signal</span>
        <span>${escapeHtml(run.reason)}</span>
      </div>
    `;
    nexusSignalList.appendChild(item);
  });

  if (!uniqueGaps.length) {
    const item = document.createElement("div");
    item.className = "nexus-item";
    item.innerHTML = `
      <strong>No critical gaps detected</strong>
      <div class="block-meta">
        <span>Keep ingesting quizzes and notes for sharper diagnostics</span>
      </div>
    `;
    nexusSignalList.appendChild(item);
  }
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
    course: input.course || "",
    kind: input.kind || "homework",
    difficulty: input.difficulty || "medium",
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
      course: run.assignment.course,
      kind: run.assignment.kind,
      difficulty: run.assignment.difficulty,
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
    meta.textContent = `${run.assignment.course ? `${run.assignment.course} · ` : ""}${run.assignment.kind || "homework"} · ${run.assignment.difficulty || "medium"} · Due ${run.assignment.due} · ${run.assignment.hours}h · ${turnInLabel} turn-in · ${run.sessions.length} block suggestion(s)`;

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

    const cadenceButton = document.createElement("button");
    cadenceButton.type = "button";
    cadenceButton.textContent = run.cadenceQueueId
      ? "Update Cadence Handoff"
      : "Stage for Cadence";
    cadenceButton.addEventListener("click", () =>
      stageNexusSuggestionForCadence(run.id)
    );

    actions.append(addAssignmentButton, addAllButton, cadenceButton);

    if (run.appliedAssignmentId) {
      const badge = document.createElement("div");
      badge.className = "nexus-badge";
      badge.textContent = "Synced to planner";
      item.append(badge);
    }

    if (run.cadenceQueueId) {
      const cadenceBadge = document.createElement("div");
      cadenceBadge.className = "nexus-badge";
      cadenceBadge.textContent = "Cadence handoff queued";
      item.append(cadenceBadge);
    }

    item.append(heading, meta, source, actions);
    nexusSuggestionList.appendChild(item);
  });
};

const renderQuizOutput = () => {
  if (!quizList) {
    return;
  }

  quizList.innerHTML = "";
  if (!quizRuns.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Generate a quiz from a topic to start practicing.";
    quizList.appendChild(empty);
    return;
  }

  quizRuns.slice(0, 1).forEach((run) => {
    const header = document.createElement("div");
    header.className = "nexus-item";

    const title = document.createElement("strong");
    title.textContent = `Quiz: ${run.topic}`;

    const meta = document.createElement("div");
    meta.className = "block-meta";
    meta.textContent = `${run.style} · ${run.questions.length} question(s) · ${new Date(
      run.createdAt
    ).toLocaleString()}`;

    header.append(title, meta);
    quizList.appendChild(header);

    run.questions.forEach((question, index) => {
      const item = document.createElement("div");
      item.className = "nexus-item";

      const q = document.createElement("strong");
      q.textContent = `${index + 1}. [${question.type}] ${question.question}`;

      const a = document.createElement("p");
      a.className = "nexus-preview";
      a.textContent = `Answer guide: ${question.answer}`;

      item.append(q, a);
      quizList.appendChild(item);
    });
  });
};

const renderAll = () => {
  renderTimeline();
  renderPlanner();
  renderBlockList();
  renderAssignmentList();
  renderAssignmentOptions();
  renderCourseAutocomplete();
  renderPriorityStack();
  renderAlerts();
  renderAiSettings();
  renderCadenceIntegration();
  renderCourseFiles();
  renderClassProgress();
  renderNexusSignals();
  renderNexusSuggestions();
  renderQuizOutput();
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
  courseFiles = courseFiles.map((file) =>
    file.assignmentId === id
      ? { ...file, assignmentId: "", assignmentTitle: "" }
      : file
  );
  saveAssignments(assignments);
  saveBlocks(focusBlocks);
  saveNexusRuns(nexusRuns);
  saveCourseFiles(courseFiles);
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
  const course = assignmentCourse ? assignmentCourse.value.trim() : "";
  const kind = assignmentKind ? assignmentKind.value : "homework";
  const difficulty = assignmentDifficulty ? assignmentDifficulty.value : "medium";
  const turnIn = assignmentTurnIn ? assignmentTurnIn.value : "online";

  const assignment = {
    id: assignmentIdField?.value || crypto.randomUUID?.() || String(Date.now()),
    title,
    due,
    hours,
    course,
    kind,
    difficulty,
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
  courseFiles = courseFiles.map((file) =>
    file.assignmentId === assignment.id
      ? {
          ...file,
          assignmentTitle: assignment.title,
          course: assignment.course || file.course || "",
        }
      : file
  );

  saveAssignments(assignments);
  saveBlocks(focusBlocks);
  saveCourseFiles(courseFiles);
  renderAll();

  assignmentStatus.textContent = "Assignment saved.";
  assignmentForm.reset();
  closeAssignmentModal();

  if (focusAssignment) {
    focusAssignment.value = assignment.id;
  }
});

assignmentSearch?.addEventListener("input", () => {
  assignmentFilterState.search = assignmentSearch.value || "";
  renderAll();
});

assignmentCourseFilter?.addEventListener("change", () => {
  assignmentFilterState.course = assignmentCourseFilter.value || "all";
  renderAll();
});

assignmentStatusFilter?.addEventListener("change", () => {
  assignmentFilterState.status = assignmentStatusFilter.value || "all";
  renderAll();
});

quickCaptureClearButton?.addEventListener("click", () => {
  if (quickCaptureForm) {
    quickCaptureForm.reset();
  }
  if (quickCaptureStatus) {
    quickCaptureStatus.textContent =
      "Quick capture turns one line into an assignment and suggested focus blocks.";
  }
});

quickCaptureForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = (quickCaptureInput?.value || "").trim();
  if (!text) {
    if (quickCaptureStatus) {
      quickCaptureStatus.textContent = "Enter a short assignment line first.";
    }
    return;
  }

  const suggestion = createNexusSuggestion("assignment", text);
  nexusRuns.unshift(suggestion);
  nexusRuns = nexusRuns.slice(0, 20);
  saveNexusRuns(nexusRuns);
  applyNexusSuggestion(suggestion.id, true);

  if (quickCaptureStatus) {
    quickCaptureStatus.textContent = `Added "${suggestion.assignment.title}" and scheduled ${suggestion.sessions.length} focus block(s).`;
  }

  if (quickCaptureForm) {
    quickCaptureForm.reset();
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

courseFileClearButton?.addEventListener("click", () => {
  courseFiles = [];
  saveCourseFiles(courseFiles);
  renderAll();
  if (courseFileStatus) {
    courseFileStatus.textContent = "Course materials library cleared.";
  }
  if (courseFileInput) {
    courseFileInput.value = "";
  }
});

courseFileForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const files = Array.from(courseFileInput?.files || []);
  if (!files.length) {
    if (courseFileStatus) {
      courseFileStatus.textContent = "Choose at least one file to add.";
    }
    return;
  }

  const course = courseFileCourse?.value.trim() || "";
  const kind = courseFileKind?.value || "syllabus";
  const assignmentId = courseFileAssignment?.value || "";
  const assignmentMatch = assignments.find(
    (assignment) => assignment.id === assignmentId
  );
  const resolvedCourse = course || assignmentMatch?.course || "";
  const submitButton = courseFileForm.querySelector('button[type="submit"]');
  let previewCount = 0;

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Adding...";
  }

  try {
    for (const file of files) {
      const snippetResult = await readFileSnippet(file);
      if (snippetResult.canPreview && snippetResult.text) {
        previewCount += 1;
      }

      courseFiles.unshift({
        id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size || 0,
        type: file.type || "unknown",
        course: resolvedCourse,
        kind,
        assignmentId,
        assignmentTitle: assignmentMatch?.title || "",
        uploadedAt: Date.now(),
        textSnippet: snippetResult.text || "",
      });
    }

    courseFiles = courseFiles.slice(0, 100);
    saveCourseFiles(courseFiles);
    renderAll();

    if (courseFileStatus) {
      courseFileStatus.textContent = `Added ${files.length} file${
        files.length === 1 ? "" : "s"
      }. ${previewCount} text preview${previewCount === 1 ? "" : "s"} available.`;
    }

    if (courseFileInput) {
      courseFileInput.value = "";
    }
    if (courseFileAssignment) {
      courseFileAssignment.value = "";
    }
  } catch (error) {
    if (courseFileStatus) {
      courseFileStatus.textContent =
        "Could not save all files. Try fewer/lower-size files (browser storage limit).";
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Add Files";
    }
  }
});

courseFileAssignment?.addEventListener("change", () => {
  if (!courseFileCourse) {
    return;
  }
  if (courseFileCourse.value.trim()) {
    return;
  }
  const linked = assignments.find(
    (assignment) => assignment.id === courseFileAssignment.value
  );
  if (linked?.course) {
    courseFileCourse.value = linked.course;
  }
});

cadenceExportButton?.addEventListener("click", () => {
  exportCadenceQueueAsJson();
});

cadenceClearButton?.addEventListener("click", () => {
  clearCadenceQueue();
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
        : "Nexus Prep ran in local parser mode. Enable developer AI integration later for live synthesis.";
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

quizClearButton?.addEventListener("click", () => {
  quizForm?.reset();
  if (quizStatus) {
    quizStatus.textContent = "Quiz input cleared.";
  }
});

quizForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const topic = quizTopic?.value.trim() || "";
  const count = Math.max(1, Math.min(10, Number(quizCount?.value || 5)));
  const style = quizStyle?.value || "mixed";

  if (!topic) {
    if (quizStatus) {
      quizStatus.textContent = "Enter a topic first.";
    }
    return;
  }

  const run = {
    id: crypto.randomUUID?.() || String(Date.now()),
    topic,
    count,
    style,
    createdAt: Date.now(),
    questions: generateQuizQuestions(topic, count, style),
  };

  quizRuns.unshift(run);
  quizRuns = quizRuns.slice(0, 10);
  saveQuizRuns(quizRuns);
  renderAll();

  if (quizStatus) {
    quizStatus.textContent =
      aiSettings.enabled && aiSettings.apiKey
        ? "Quiz generated in local mode. AI quiz generation can be wired to your developer key next."
        : "Quiz generated in local mode.";
  }
});

renderAll();
