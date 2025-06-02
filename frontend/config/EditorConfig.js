import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

export const editorConfigs = {
  html: {
    name: "HTML",
    icon: "/lang Icons/HTML icon.svg",
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
    icon: "/lang Icons/javascript Icon.svg",
    extension: javascript(),
    language: "JavaScript",
    language_id: 63,
  },
  python: {
    name: "Python",
    icon: "./lang Icons/python Icon.svg",
    extension: python(),
    language: "Python",
    language_id: 71,
  },
};
