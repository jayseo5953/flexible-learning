#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const modePath = path.join(repoRoot, ".mode");

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function normalizeRelative(candidate) {
  if (typeof candidate !== "string" || candidate.trim() === "") {
    return null;
  }

  const withoutQuotes = candidate.trim().replace(/^['"]|['"]$/g, "");
  const absolute = path.isAbsolute(withoutQuotes)
    ? path.resolve(withoutQuotes)
    : path.resolve(repoRoot, withoutQuotes);

  if (!absolute.startsWith(repoRoot + path.sep) && absolute !== repoRoot) {
    return "__outside__";
  }

  return path.relative(repoRoot, absolute).split(path.sep).join("/");
}

function getMode() {
  const mode = readJson(modePath);
  if (!mode) {
    return {
      dev: true,
      activeInstance: null,
    };
  }

  if (mode.dev !== true) {
    return {
      dev: false,
      activeInstance: mode && typeof mode.activeInstance === "string" ? mode.activeInstance : null,
    };
  }

  return {
    dev: true,
    activeInstance: typeof mode.activeInstance === "string" ? mode.activeInstance : null,
  };
}

function discoverSingleInstance() {
  const learnDir = path.join(repoRoot, "learn");
  try {
    const instances = fs
      .readdirSync(learnDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    return instances.length === 1 ? instances[0] : null;
  } catch {
    return null;
  }
}

function allowedLearnTargets(mode) {
  const activeInstance = mode.activeInstance || discoverSingleInstance();
  const allowed = new Set([".mode"]);

  if (activeInstance) {
    allowed.add(`learn/${activeInstance}/sessions.md`);
  }

  return allowed;
}

function isAllowedTarget(relativePath, allowed) {
  return relativePath !== "__outside__" && allowed.has(relativePath);
}

function block(reason) {
  process.stdout.write(
    JSON.stringify({
      decision: "block",
      reason,
    }) + "\n",
  );
}

function collectPatchTargets(text) {
  const targets = [];
  const patterns = [
    /^\*\*\* Add File:\s+(.+)$/gm,
    /^\*\*\* Update File:\s+(.+)$/gm,
    /^\*\*\* Delete File:\s+(.+)$/gm,
    /^\*\*\* Move to:\s+(.+)$/gm,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      targets.push(match[1]);
    }
  }

  return targets;
}

function looksWriteLikeCommand(command) {
  return /\b(apply_patch|cat|cp|mv|mkdir|rm|sed|perl|tee|touch|chmod|chown|git\s+(add|commit|reset|checkout|restore|clean|mv|rm)|npm\s+(install|update)|pnpm\s+(install|update)|yarn\s+(add|install|upgrade))\b|>>?|<<|<<<|\b(node|python3?|ruby|bash|zsh|sh)\b.*\b(writeFileSync|appendFileSync|openSync|unlinkSync|rmSync|mkdirSync)\b/.test(
    command,
  );
}

function collectCommandTargets(command) {
  const targets = new Set();
  const quotedOrBarePath =
    /(?:^|\s)(?:['"]([^'"]+)['"]|((?:\.\/)?(?:AGENTS\.md|package\.json|\.gitignore|\.mode|docs\/[^\s'"]+|templates\/[^\s'"]+|skills\/[^\s'"]+|hooks\/[^\s'"]+|examples\/[^\s'"]+|learn\/[^\s'"]+|profile\.md|curriculum\.md|sessions\.md)))/g;

  let match;
  while ((match = quotedOrBarePath.exec(command)) !== null) {
    targets.add(match[1] || match[2]);
  }

  return [...targets];
}

function collectExplicitPathFields(value, output = []) {
  if (!value || typeof value !== "object") {
    return output;
  }

  for (const [key, child] of Object.entries(value)) {
    if (["cwd", "workdir", "working_dir", "workingDirectory"].includes(key)) {
      continue;
    }

    if (
      typeof child === "string" &&
      /^(path|file|filename|target|dest|destination|source|uri)$/i.test(key)
    ) {
      output.push(child);
    } else if (Array.isArray(child)) {
      for (const item of child) {
        collectExplicitPathFields(item, output);
      }
    } else if (child && typeof child === "object") {
      collectExplicitPathFields(child, output);
    }
  }

  return output;
}

function getToolInput(event) {
  return (
    event.tool_input ||
    event.toolInput ||
    event.input ||
    event.arguments ||
    event.params ||
    event
  );
}

function main() {
  const raw = readStdin();
  const event = raw.trim() ? JSON.parse(raw) : {};
  const mode = getMode();

  if (mode.dev) {
    return;
  }

  const allowed = allowedLearnTargets(mode);
  const toolName = event.tool_name || event.toolName || event.name || "";
  const toolInput = getToolInput(event);
  const targets = [];

  if (/apply_patch/i.test(toolName) || typeof toolInput === "string") {
    const patchText =
      typeof toolInput === "string"
        ? toolInput
        : typeof toolInput.command === "string"
          ? toolInput.command
          : JSON.stringify(toolInput);
    targets.push(...collectPatchTargets(patchText));
  }

  if (toolInput && typeof toolInput === "object") {
    const command = toolInput.cmd || toolInput.command;
    if (typeof command === "string") {
      if (looksWriteLikeCommand(command)) {
        targets.push(...collectCommandTargets(command));
        if (targets.length === 0) {
          block(
            "Learn mode blocks write-like shell commands unless the target is .mode or the active instance sessions.md. Switch to /mode dev for framework or instance maintenance.",
          );
          return;
        }
      }
    }

    targets.push(...collectExplicitPathFields(toolInput));
  }

  const normalizedTargets = [...new Set(targets.map(normalizeRelative).filter(Boolean))];
  const blocked = normalizedTargets.filter((target) => !isAllowedTarget(target, allowed));

  if (blocked.length > 0) {
    block(
      `Learn mode blocks writes to ${blocked.join(", ")}. Allowed targets are ${[
        ...allowed,
      ].join(", ")}. Switch to /mode dev for framework, profile, curriculum, hook, template, doc, or example edits.`,
    );
  }
}

try {
  main();
} catch (error) {
  block(`Mode guard failed closed: ${error.message}`);
}
