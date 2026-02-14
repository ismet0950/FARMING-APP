"use client";

import { useEffect } from "react";

const INGEST =
  "http://127.0.0.1:7242/ingest/881cc491-2391-4303-9f75-588f9f9185e0";

export default function DebugTailwind() {
  useEffect(() => {
    const run = () => {
      const el = document.querySelector('[data-debug="tailwind-check"]');
      if (!el || !(el instanceof HTMLElement)) {
        fetch(INGEST, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hypothesisId: "H4",
            location: "DebugTailwind.tsx:run",
            message: "Element not found",
            data: { found: false },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
        return;
      }
      const computed = window.getComputedStyle(el);
      const bgColor = computed.backgroundColor;
      const className = el.getAttribute("class") || "";
      const stylesheetCount = document.styleSheets.length;
      let hasBlue700Rule = false;
      try {
        for (let i = 0; i < Math.min(document.styleSheets.length, 15); i++) {
          const sheet = document.styleSheets[i];
          try {
            const rules = sheet.cssRules || sheet.rules;
            if (!rules) continue;
            for (let j = 0; j < Math.min(rules.length, 500); j++) {
              const r = rules[j];
              const text = (r as CSSRule).cssText || "";
              if (text.includes("blue-700") || text.includes("29, 78, 216") || text.includes("rgb(29 78 216)")) {
                hasBlue700Rule = true;
                break;
              }
            }
          } catch (_) {}
          if (hasBlue700Rule) break;
        }
      } catch (_) {}
      fetch(INGEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesisId: "H2",
          location: "DebugTailwind.tsx:computed",
          message: "Computed style and DOM class",
          data: {
            className,
            computedBackgroundColor: bgColor,
            expectedBlue700: "rgb(29, 78, 216)",
            stylesheetCount,
            hasBlue700Rule,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      fetch(INGEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesisId: "H4",
          location: "DebugTailwind.tsx:className",
          message: "className on DOM",
          data: { className, hasBgBlue700: className.includes("bg-blue-700") },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      fetch(INGEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesisId: "H1",
          location: "DebugTailwind.tsx:generated",
          message: "Utility in stylesheets",
          data: { hasBlue700Rule, stylesheetCount },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      fetch(INGEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesisId: "H3",
          location: "DebugTailwind.tsx:sheets",
          message: "CSS loaded",
          data: { stylesheetCount },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    };
    run();
    const t = setTimeout(run, 500);
    return () => clearTimeout(t);
  }, []);
  return null;
}
