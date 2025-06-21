import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

export const editorConfigs = {
  // html: {
  //   name: "HTML",
  //   icon: "/lang Icons/HTML icon.svg",
  //   extension: html(),
  //   language: "webDev",
  // },
  // css: {
  //   name: "CSS",
  //   icon: "css",
  //   extension: css(),
  //   language: "webDev",
  // },
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
  java: {
    name: "Java",
    icon: "./lang Icons/java icon.svg",
    extension: java(),
    language: "Java",
    language_id: 62,
  },
  cpp: {
    name: "C++",
    icon: "./lang Icons/cpp.svg",
    extension: cpp(),
    language: "C++",
    language_id: 74,
  },
};
