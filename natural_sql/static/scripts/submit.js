import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { onTextareaInput, tx } from "./textarea.js";

const submitButton = document.querySelector("#submit");
const displayField = document.querySelector("#card-output");
const txtareaField = document.querySelector("#myTextarea");

if (!localStorage.getItem("localArray")) {
  localStorage.setItem("localArray", JSON.stringify([]));
} else {
  for (let m of JSON.parse(localStorage.getItem("localArray"))) {
    let newDiv = document.createElement("div");
    newDiv.className = m["role"] + "_message";
    if (m["role"] === "assistant") {
      newDiv.innerHTML = `<pre>${JSON.stringify(JSON.parse(m["content"]), null, 4)}</pre>`;
    } else {
      newDiv.innerHTML = m["content"];
    }
    displayField.appendChild(newDiv);
  }
}

function addToList(newMessage) {
  let messageArray = JSON.parse(localStorage.getItem("localArray"));
  messageArray.push(newMessage);
  messageArray = messageArray.slice(-10);
  localStorage.setItem("localArray", JSON.stringify(messageArray));

  let newDiv = document.createElement("div");
  newDiv.className = newMessage["role"] + "_message";
  if (newMessage["role"] === "assistant") {
    newDiv.innerHTML = `<pre>${JSON.stringify(JSON.parse(m["content"]), null, 4)}</pre>`;
  } else {
    newDiv.innerHTML = newMessage["content"];
  }
  displayField.appendChild(newDiv);
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
    .finally(() => {
      svgSubmitPlane.classList.toggle("hide");
      svgSubmitStop.classList.toggle("hide");
    });

  // fetch("/api/openai/chat-completion", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     message: txtareaField.value,
  //     user: "user-001",
  //   }),
  // })
  //   .then((response) => {
  //     txtareaField.value = "";
  //     onTextareaInput.call(tx);
  //     if (!response.ok) {
  //       throw new Error("API call failed.");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     let contentMessage = data["choices"][0]["message"]["content"];
  //     return contentMessage;
  //   })
  //   .then((gptResult) => {
  //     const renderedMarkdown = marked(gptResult);
  //     displayField.innerHTML = renderedMarkdown;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
