(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var manualTheme = null;

  function getSystemTheme() {
    return mediaQuery.matches ? "dark" : "light";
  }

  function getEffectiveTheme() {
    return manualTheme || getSystemTheme();
  }

  function setToggleA11y(theme) {
    var nextTheme = theme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    toggle.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
    toggle.setAttribute("title", "Switch to " + nextTheme + " mode");
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    setToggleA11y(theme);
  }

  applyTheme(getEffectiveTheme());

  toggle.addEventListener("click", function () {
    var current = getEffectiveTheme();
    var system = getSystemTheme();
    var next = current === "dark" ? "light" : "dark";
    manualTheme = next === system ? null : next;
    applyTheme(next);
  });

  function syncWithSystemTheme() {
    if (manualTheme) {
      return;
    }
    applyTheme(getSystemTheme());
  }

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", syncWithSystemTheme);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(syncWithSystemTheme);
  }
})();
