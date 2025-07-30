import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

export const editorConfigs = {
  html: {
    name: "webDev",
    render: "html",
    icon: "/lang Icons/javascript icon.svg",
    extension: html(),
    language: "webDev",
  },
  css: {
    name: "CSS",
    render: "css",
    icon: "/lang Icons/javascript icon.svg",
    extension: css(),
    language: "webDev",
  },
  js: {
    name: "JavaScript",
    render: "js",
    icon: "/lang Icons/javascript Icon.svg",
    extension: javascript(),
    language: "webDev",
    language_id: 63,
  },
  // python: {
  //   name: "Python",
  //   icon: "./lang Icons/python Icon.svg",
  //   extension: python(),
  //   language: "Python",
  //   language_id: 71,
  // },
  // java: {
  //   name: "Java",
  //   icon: "./lang Icons/java icon.svg",
  //   extension: java(),
  //   language: "Java",
  //   language_id: 62,
  // },
  // cpp: {
  //   name: "C++",
  //   icon: "./lang Icons/cpp.svg",
  //   extension: cpp(),
  //   language: "C++",
  //   language_id: 74,
  // },
};
