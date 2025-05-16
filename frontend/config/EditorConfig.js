import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

export const editorConfigs = {
  html: {
    name: "HTML",
    icon: "html",
    extension: html(),
    language: "webDev",
  },
  css: {
    name: "CSS",
    icon: "css",
    extension: css(),
    language: "webDev",
  },
  js: {
    name: "JavaScript",
    icon: "js",
    extension: javascript(),
    language: "webDev",
  },
  python: {
    name: "Python",
    icon: "python",
    extension: python(),
    language: "python",
  },
};
