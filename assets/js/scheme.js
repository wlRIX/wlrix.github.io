// The scheme switcher and the toolchest's open/close behavior.
//
// The stylesheet already does the work: Classic on :root, Gotham under
// prefers-color-scheme, and both again under [data-scheme]. All this does is
// set that attribute and remember the choice.

(function () {
  "use strict";

  var KEY = "wlrix-scheme";
  var root = document.documentElement;

  // Storage throws outright in some contexts (a private window with site data
  // blocked), so every access is guarded and the page still renders without it.
  function stored() {
    try {
      var value = localStorage.getItem(KEY);
      return value === "classic" || value === "gotham" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function remember(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* A choice that cannot be saved still applies for this page. */
    }
  }

  // What the page is showing right now: an explicit choice if there is one,
  // otherwise whatever the system asked for.
  function active() {
    var chosen = root.getAttribute("data-scheme");
    if (chosen) return chosen;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "gotham"
      : "classic";
  }

  function label(button) {
    var next = active() === "gotham" ? "Classic" : "Gotham";
    button.textContent = "Scheme: " + next;
    button.setAttribute("aria-label", "Switch to the " + next + " color scheme");
  }

  function initToggle() {
    var button = document.querySelector(".scheme-toggle");
    if (!button) return;

    // The button does nothing without this script, so the markup ships it
    // hidden and it appears only once it works.
    button.hidden = false;
    label(button);
    button.addEventListener("click", function () {
      var next = active() === "gotham" ? "classic" : "gotham";
      root.setAttribute("data-scheme", next);
      remember(next);
      label(button);
    });

    // With no explicit choice stored, the button follows the system if the
    // system changes under it.
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function () {
        if (!root.getAttribute("data-scheme")) label(button);
      });
  }

  // The toolchest. Pointer devices open a flyout on hover through CSS alone;
  // this exists for keyboard and touch, and keeps aria-expanded honest either
  // way.
  function initToolchest() {
    var groups = Array.prototype.slice.call(
      document.querySelectorAll(".toolchest__group")
    );
    if (!groups.length) return;

    function close(group) {
      group.classList.remove("is-open");
      var button = group.querySelector(".toolchest__top");
      if (button) button.setAttribute("aria-expanded", "false");
    }

    function closeAll(except) {
      groups.forEach(function (group) {
        if (group !== except) close(group);
      });
    }

    groups.forEach(function (group) {
      var button = group.querySelector(".toolchest__top");
      if (!button) return;

      button.addEventListener("click", function () {
        var open = group.classList.toggle("is-open");
        button.setAttribute("aria-expanded", open ? "true" : "false");
        // One drawer at a time, as the real toolchest does.
        if (open) closeAll(group);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var open = document.querySelector(".toolchest__group.is-open");
      if (!open) return;
      var button = open.querySelector(".toolchest__top");
      close(open);
      if (button) button.focus();
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".toolchest__group")) closeAll(null);
    });
  }

  // Kramdown gives a wide table no wrapper to scroll inside, so it gets one
  // here. The stylesheet has a fallback for when this has not run; it just
  // leaves the header row short of the well's right edge.
  function wrapTables() {
    var tables = document.querySelectorAll(".prose table");
    Array.prototype.forEach.call(tables, function (table) {
      if (table.parentNode.classList.contains("table-scroll")) return;
      var wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  initToggle();
  initToolchest();
  wrapTables();
})();
