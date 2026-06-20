/**
 * Sohail Ahmed Mohammed - Portfolio JS Logic
 * Implements Terminal Simulator, Scroll Spy, Fallback Image Loader, and Certificate Modal Lightbox.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check for prefers-reduced-motion
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ==========================================================================
  // REAL-TIME RUNNING TIMER (STATUS BAR)
  // ==========================================================================
  // const timeElapsedEl = document.getElementById("timeElapsed");
  // let startTime = Date.now();
  // let timerInterval;

  // function startTimer() {
  //   timerInterval = setInterval(() => {
  //     const elapsed = (Date.now() - startTime) / 1000;
  //     timeElapsedEl.textContent = elapsed.toFixed(1) + "s";
  //   }, 100);
  // }
  // startTimer();

  // ==========================================================================
  // HERO TERMINAL SIMULATOR
  // ==========================================================================
  const terminalBody = document.getElementById("terminalBody");
  const terminalTitle = document.getElementById("terminalTitle");
  const replayBtn = document.getElementById("replayTerminalBtn");

  const terminalScenarios = [
    {
      title: "playwright-suite.spec.ts",
      lines: [
        {
          type: "cmd",
          text: "npx playwright test --project=all --reporter=line",
        },
        { type: "info", text: "Running 6 tests using 3 workers" },
        {
          type: "pass",
          text: "[chromium] › auth.spec.ts · user login quote flow",
          duration: "312ms",
        },
        {
          type: "pass",
          text: "[firefox] › onboarding.spec.ts · completes profile",
          duration: "489ms",
        },
        {
          type: "pass",
          text: "[webkit] › api.spec.ts · POST /policies 201 created",
          duration: "198ms",
        },
        {
          type: "pass",
          text: "[mobile chrome] › dashboard.spec.ts · verify ledger balance",
          duration: "654ms",
        },
        {
          type: "pass",
          text: "[mobile webkit] › checkout.spec.ts · payment process BDD",
          duration: "521ms",
        },
        {
          type: "pass",
          text: "[edge] › accessibility.spec.ts · WCAG 2.1 audit",
          duration: "287ms",
        },
        { type: "summary", text: "6 passed", duration: "2.46s" },
      ],
    },
    {
      title: "appium-mobile-pytest.py",
      lines: [
        {
          type: "cmd",
          text: "pytest mobile_regression.py --device-matrix=cloud",
        },
        {
          type: "info",
          text: "Targeting BrowserStack Appium Grid (iOS 17 & Android 14)",
        },
        {
          type: "pass",
          text: "tests/auth_test.py::test_biometric_login[Pixel 8]",
          duration: "28s",
        },
        {
          type: "pass",
          text: "tests/auth_test.py::test_face_id_login[iPhone 15]",
          duration: "32s",
        },
        {
          type: "pass",
          text: "tests/checkout_test.py::test_in_app_purchase[iPhone 14]",
          duration: "45s",
        },
        {
          type: "pass",
          text: "tests/sync_test.py::test_offline_data_sync[Galaxy S23]",
          duration: "37s",
        },
        { type: "summary", text: "4 passed", duration: "2m 22s" },
      ],
    },
    {
      title: "etl-pipeline-check.sql",
      lines: [
        { type: "cmd", text: "python -m unittest validate_etl.py" },
        {
          type: "info",
          text: "Validating financial ingestion pipeline: LedgerDB -> Warehouse",
        },
        {
          type: "pass",
          text: "test_record_counts (validate_etl.SourceWarehouseReconciliation)",
          duration: "1.2s",
        },
        {
          type: "pass",
          text: "test_schema_matching (validate_etl.DataWarehouseContractTest)",
          duration: "0.8s",
        },
        {
          type: "pass",
          text: "test_null_value_constraints (validate_etl.DataQualityRules)",
          duration: "2.1s",
        },
        {
          type: "pass",
          text: "test_currency_exchange_math (validate_etl.LedgerPipelineTest)",
          duration: "1.5s",
        },
        { type: "summary", text: "4 passed", duration: "5.6s" },
      ],
    },
    {
      title: "performance-gate-k6.js",
      lines: [
        { type: "cmd", text: "k6 run --out cloud performance_load_test.js" },
        {
          type: "info",
          text: "Simulating 500 concurrent virtual users (VUs) for 30s",
        },
        {
          type: "pass",
          text: "http_req_duration (p95 threshold < 500ms)",
          duration: "342ms",
        },
        {
          type: "pass",
          text: "http_req_failed (error rate threshold < 1%)",
          duration: "0.00%",
        },
        {
          type: "pass",
          text: "http_reqs (throughput requirement > 400 rps)",
          duration: "450/s",
        },
        {
          type: "summary",
          text: "Performance thresholds satisfied",
          duration: "30s",
        },
      ],
    },
  ];

  let currentScenarioIdx = 0;
  let terminalTimeout;

  function runTerminalScenario(idx) {
    clearTimeout(terminalTimeout);
    terminalBody.innerHTML = "";

    const scenario = terminalScenarios[idx];
    terminalTitle.textContent = scenario.title;

    let lineIdx = 0;

    function printNextLine() {
      if (lineIdx >= scenario.lines.length) {
        // Add final prompt line with blinking cursor
        const cursorLine = document.createElement("div");
        cursorLine.className = "terminal-line";
        cursorLine.innerHTML = `<span class="prompt">➜</span> <span class="cursor"></span>`;
        terminalBody.appendChild(cursorLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;

        // Schedule next scenario in 8s
        terminalTimeout = setTimeout(() => {
          currentScenarioIdx =
            (currentScenarioIdx + 1) % terminalScenarios.length;
          runTerminalScenario(currentScenarioIdx);
        }, 8000);
        return;
      }

      const lineData = scenario.lines[lineIdx];
      const lineEl = document.createElement("div");
      lineEl.className = "terminal-line";

      if (lineData.type === "cmd") {
        lineEl.innerHTML = `<span class="prompt">➜</span> <span class="cmd">${lineData.text}</span>`;
      } else if (lineData.type === "info") {
        lineEl.className = "terminal-line text-muted";
        lineEl.textContent = lineData.text;
      } else if (lineData.type === "pass") {
        lineEl.innerHTML = `<span class="pass-tick">✓</span> ${lineData.text} <span class="duration">${lineData.duration}</span>`;
      } else if (lineData.type === "summary") {
        lineEl.className = "terminal-line summary-box";
        lineEl.innerHTML = `<strong>SUCCESS:</strong> ${lineData.text} <span class="duration">elapsed: ${lineData.duration}</span>`;
      }

      terminalBody.appendChild(lineEl);
      terminalBody.scrollTop = terminalBody.scrollHeight;

      lineIdx++;
      const delay = reduceMotion ? 50 : lineData.type === "cmd" ? 800 : 400;
      terminalTimeout = setTimeout(printNextLine, delay);
    }

    printNextLine();
  }

  // Initial Run
  runTerminalScenario(currentScenarioIdx);

  // Replay click
  replayBtn.addEventListener("click", () => {
    runTerminalScenario(currentScenarioIdx);
  });

  // ==========================================================================
  // NAVIGATION & SCROLL OBSERVER (TEST SUITE STATUS GUIDES)
  // ==========================================================================
  const navItems = document.querySelectorAll(".nav-item");
  const statusDot = document.getElementById("statusDot");
  const passCountEl = document.getElementById("passCount");
  const failCountEl = document.getElementById("failCount");

  const visitedSections = new Set();
  const totalSections = navItems.length;

  // Map data-target to HTML section elements
  const sections = Array.from(navItems)
    .map((item) => {
      return document.getElementById(item.getAttribute("data-target"));
    })
    .filter((el) => el !== null);

  // Setup intersection observer
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          // Update active nav rail classes
          navItems.forEach((item) => {
            if (item.getAttribute("data-target") === sectionId) {
              item.classList.add("active");

              // "Check off" as passed (green checkmark) if not already
              if (!visitedSections.has(sectionId)) {
                visitedSections.add(sectionId);
                item.classList.add("checked");

                const marker = item.querySelector(".nav-marker");
                if (marker) marker.textContent = "✓";

                // Animate counters
                updateStatusBarCounters();
              }
            } else {
              item.classList.remove("active");
            }
          });

          // Trigger specific section animations (e.g. skills progress bars)
          if (sectionId === "skills") {
            animateSkillsBars();
          }
        }
      });
    },
    {
      // Trigger when section occupies 25% of viewport
      threshold: 0.05,
      rootMargin: "-10% 0px -20% 0px",
    },
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  // Update status bar dashboard metrics
  function updateStatusBarCounters() {
    const passedCount = visitedSections.size;
    const failedCount = totalSections - passedCount;

    passCountEl.textContent = passedCount;
    failCountEl.textContent = failedCount;

    if (passedCount === totalSections) {
      statusDot.className = "status-dot green";
    }
  }

  // Smooth scroll links
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    });
  });

  // ==========================================================================
  // SKILLS PROGRESS BARS ANIMATION
  // ==========================================================================
  let skillsAnimated = false;

  function animateSkillsBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillItems = document.querySelectorAll(".skill-bar-item");
    skillItems.forEach((item) => {
      const pct = item.getAttribute("data-pct");
      const fill = item.querySelector(".skill-fill");
      if (fill) {
        // Subtle offset delay for a sequential filling effect
        const delay = reduceMotion ? 0 : Math.random() * 300;
        setTimeout(() => {
          fill.style.width = pct + "%";
        }, delay);
      }
    });
  }

  // ==========================================================================
  // IMAGE ERROR FALLBACK LOADER
  // ==========================================================================
  window.handleBrokenImage = function (img, fallbackType, title, subtitle) {
    const parent = img.parentNode;
    const placeholder = document.createElement("div");
    placeholder.className =
      fallbackType === "cert" ? "cert-placeholder" : "ach-placeholder";

    let svgIcon = "";
    if (fallbackType === "cert") {
      svgIcon = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
      placeholder.innerHTML = `${svgIcon}<span><strong>${title}</strong><br><small>${subtitle}</small></span>`;

      // Store placeholder HTML data on parent cert card for modal fallback use
      // img.addEventListener("error", function () {
      const card = img.closest(".cert-card-interactive");
      if (card) {
        card.setAttribute("data-has-fallback", "true");
        card.setAttribute("data-fallback-title", title);
        card.setAttribute("data-fallback-subtitle", subtitle);
      }
      // });
    } else {
      // Achievements fallback icons based on text
      let iconCode = "🏆";
      if (title.includes("Dean's")) iconCode = "🎓";
      else if (title.includes("Regression") || title.includes("Playwright"))
        iconCode = "⚙️";
      else if (title.includes("Instructor") || title.includes("Tutor"))
        iconCode = "👨‍🏫";
      else if (title.includes("Research")) iconCode = "🔬";

      placeholder.innerHTML = `<span style="font-size: 28px; margin-bottom: 6px;">${iconCode}</span><span><strong>${title}</strong></span>`;
    }

    if (parent) {
      parent.replaceChild(placeholder, img);
    }
  };

  // Bind errors on images
  const allImgs = document.querySelectorAll("img");
  allImgs.forEach((img) => {
    img.addEventListener("error", () => {
      if (img.classList.contains("cert-thumbnail-img")) {
        const title =
          img.getAttribute("data-title") || "Professional Certificate";
        const issuer = img.getAttribute("data-issuer") || "Verified Issuer";
        window.handleBrokenImage(img, "cert", title, issuer);
      } else if (img.classList.contains("ach-img")) {
        const title = img.alt || "Milestone Certificate";
        window.handleBrokenImage(img, "ach", title);
      } else if (img.id === "profilePhotoImg") {
        // Fallback for avatar photo
        img.src =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232DD4BF" width="100%25" height="100%25"><rect width="100%25" height="100%25" fill="%23111A2E"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
      }
    });

    // Force trigger error handler if already broken before JS binds
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event("error"));
    }
  });

  // ==========================================================================
  // CERTIFICATE INTERACTIVE MODAL (LIGHTBOX)
  // ==========================================================================
  const modal = document.getElementById("certModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalIssuer = document.getElementById("modalIssuerLabel");
  const modalStatus = document.getElementById("modalStatusVal");
  const modalCredId = document.getElementById("modalCredIdVal");
  const modalVerifyBtn = document.getElementById("modalVerifyBtn");
  const modalMediaPane = document.getElementById("modalMediaPane");
  const modalClose = document.getElementById("modalCloseBtn");

  const certCards = document.querySelectorAll(".cert-card-interactive");

  window.openCertModal = function (idx) {
    const card = certCards[idx];
    if (!card) return;

    const thumbnail = card.querySelector("img, .cert-placeholder");
    const isPlaceholder = card.getAttribute("data-has-fallback") === "true";

    let title, issuer, status, credId, verifyUrl, imgUrl;

    if (isPlaceholder) {
      title = card.getAttribute("data-fallback-title");
      issuer = card.getAttribute("data-fallback-subtitle");
      status = "Issued & Active";
      credId = "VERIFIED-CERT-" + idx;
      verifyUrl = "#";
    } else {
      const img = card.querySelector(".cert-thumbnail-img");
      title = img.getAttribute("data-title");
      issuer = img.getAttribute("data-issuer");
      status = img.getAttribute("data-status");
      credId = img.getAttribute("data-id");
      verifyUrl = img.getAttribute("data-url");
      imgUrl = img.src;
    }

    // Populate fields
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer.toUpperCase();
    modalStatus.textContent = status;
    modalCredId.textContent = credId;
    modalVerifyBtn.href = verifyUrl;

    // Set verify action behavior
    if (verifyUrl === "#" || !verifyUrl) {
      modalVerifyBtn.style.display = "none";
    } else {
      modalVerifyBtn.style.display = "inline-flex";
    }

    // Populate media pane
    modalMediaPane.innerHTML = "";
    if (isPlaceholder) {
      const placeholder = document.createElement("div");
      placeholder.className = "cert-placeholder";
      const svgIcon = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
      placeholder.innerHTML = `${svgIcon}<span style="font-size: 14px; margin-top: 10px;"><strong>${title}</strong><br><small>${issuer}</small></span>`;
      modalMediaPane.appendChild(placeholder);
    } else {
      const modalImg = document.createElement("img");
      modalImg.src = imgUrl;
      modalImg.alt = title;
      modalMediaPane.appendChild(modalImg);
    }

    // Open Modal
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Re-enable scrolling
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
});

// ==========================================================================
// PROJECT LIST COLLAPSE/EXPAND FUNCTION
// ==========================================================================
function toggleProject(header) {
  const item = header.parentNode;
  const isActive = item.classList.contains("active");

  // Collapse all other projects first
  const allProjects = document.querySelectorAll(".project-item");
  allProjects.forEach((proj) => {
    proj.classList.remove("active");
  });

  // Toggle current project
  if (!isActive) {
    item.classList.add("active");
  }
}
