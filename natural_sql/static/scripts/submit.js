import { onTextareaInput, tx } from "./textarea.js";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";

const hljs = require("highlight.js/lib/core");

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage("css", require("highlight.js/lib/languages/css"));
hljs.registerLanguage("sql", require("highlight.js/lib/languages/sql"));
hljs.registerLanguage(
  "plaintext",
  require("highlight.js/lib/languages/plaintext")
);

marked.use(
  {
    breaks: true,
    renderer: {
      link({ tokens, href, text }) {
        return `<a target="_blank" href=${href}>${text}</a>`;
      },
    },
  },
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return `<div class="wrapper-hljs wrapper-${lang}"><div class="title">${lang}</div><div class="source-code">${
        hljs.highlight(code, { language }).value
      }</div></div>`;
    },
  })
);

const submitButton = document.querySelector("#submit");
const displayField = document.querySelector("#card-output");
const txtareaField = document.querySelector("#myTextarea");

if (!localStorage.getItem("localArray")) {
  localStorage.setItem("localArray", JSON.stringify([]));
} else {
  for (let m of JSON.parse(localStorage.getItem("localArray"))) {
    displayMessage(m);
  }
}

function displayMessage(message) {
  let newDiv = document.createElement("div");
  let role = message["role"];
  // newDiv.className = role + "_message";
  newDiv.classList.add("markdown", role + "_message");
  let html;
  if (role === "assistant") {
    let json_data = JSON.parse(message["content"]);
    let query = json_data["SQL_query"];
    let is_injection = json_data["is_sql_injection"];
    let is_modifying = json_data["is_modifying"];
    let comment = json_data["query_comment"];
    let can_display_query = ((query.length > 0) && !(is_injection));
    let can_call_database = (can_display_query && !(is_modifying));

    // console.log(query, is_injection, is_modifying, comment);
    console.log(json_data);
    html = marked.parse(`${comment}

\`\`\`sql
${query}
\`\`\``);
  } else if (role === "user") {
    newDiv.innerHTML = message["content"];
    html = marked.parse(message["content"]);
  } else {
    throw new Error(`A message with unknown role ${role}.`);
  }
  newDiv.innerHTML = html;
  displayField.appendChild(newDiv);
}

function addToList(newMessage) {
  let messageArray = JSON.parse(localStorage.getItem("localArray"));
  messageArray.push(newMessage);
  localStorage.setItem("localArray", JSON.stringify(messageArray));

  displayMessage(newMessage);
}

let svgSubmitPlane = document.querySelector("#submit>:nth-child(1)");
let svgSubmitStop = document.querySelector("#submit>:nth-child(2)");

submitButton.addEventListener("click", () => {
  let p = new Promise((resolve, reject) => {
    let inputText = txtareaField.value.trim();
    svgSubmitPlane.classList.toggle("hide");
    svgSubmitStop.classList.toggle("hide");
    txtareaField.value = "";
    if (inputText === "" || inputText.length > 500) {
      reject("Input must be between 0 and 500 characters.");
    } else {
      resolve(inputText);
    }
  });

  p.then((inputText) => {
    addToList({ role: "user", content: inputText });
    return fetch("/api/openai/chat-completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: JSON.parse(localStorage.getItem("localArray")),
        user: "user-001",
      }),
    }).then((response) => {
      onTextareaInput.call(tx);
      if (!response.ok) {
        throw new Error("API call failed!");
      } else {
        return response.json();
      }
    });
  })
    .then((jsonObj) => {
      addToList(jsonObj["choices"][0]["message"]);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      svgSubmitPlane.classList.toggle("hide");
      svgSubmitStop.classList.toggle("hide");
    });
});
