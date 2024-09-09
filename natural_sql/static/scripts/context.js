const contextInputArea = document.querySelector(
  "dialog#change-context textarea.input"
);

const confirmContextBtn = document.querySelector(
  "dialog#change-context  div.buttons > button.apply"
);

const defaultJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6IndvcmxkIiwiaWF0IjoxNzI1ODYwNDcxLjY3NTEzNiwiaXAiOiIwLjAuMC4wIiwibWVzc2FnZSI6IntcImJ1aWxkX2NvbW1hbmRzXCI6IFwiLS0gVGFibGU6IGJvb2tzXFxuQ1JFQVRFIFRBQkxFIGJvb2tzIChcXG4gICAgYm9va19pZCBJTlQgTk9UIE5VTEwgQVVUT19JTkNSRU1FTlQgUFJJTUFSWSBLRVksXFxuICAgIHRpdGxlIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcXG4gICAgYXV0aG9yIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcXG4gICAgcHJpY2UgREVDSU1BTCgxMCwgMilcXG4pO1xcblxcbi0tIFRhYmxlOiBlbXBsb3llZXNcXG5DUkVBVEUgVEFCTEUgZW1wbG95ZWVzIChcXG4gICAgZW1wbG95ZWVfaWQgSU5UIE5PVCBOVUxMIEFVVE9fSU5DUkVNRU5UIFBSSU1BUlkgS0VZLFxcbiAgICBuYW1lIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcXG4gICAgYWdlIElOVCBOT1QgTlVMTCxcXG4gICAgc2FsYXJ5IERFQ0lNQUwoMTAsIDIpIE5PVCBOVUxMLFxcbiAgICBzdG9yZV9pZCBJTlQsXFxuICAgIEZPUkVJR04gS0VZIChzdG9yZV9pZCkgUkVGRVJFTkNFUyBzdG9yZXMoc3RvcmVfaWQpXFxuKTtcXG5cXG4tLSBUYWJsZTogc3RvcmVzXFxuQ1JFQVRFIFRBQkxFIHN0b3JlcyAoXFxuICAgIHN0b3JlX2lkIElOVCBOT1QgTlVMTCBBVVRPX0lOQ1JFTUVOVCBQUklNQVJZIEtFWSxcXG4gICAgc3RvcmVfbmFtZSBWQVJDSEFSKDI1NSkgTk9UIE5VTEwsXFxuICAgIGFkZHJlc3MgVEVYVCBOT1QgTlVMTCxcXG4gICAgbWFuYWdlcl9pZCBJTlQsXFxuICAgIEZPUkVJR04gS0VZIChtYW5hZ2VyX2lkKSBSRUZFUkVOQ0VTIGVtcGxveWVlcyhlbXBsb3llZV9pZClcXG4pO1xcblxcbi0tIFRhYmxlOiB1c2Vyc1xcbkNSRUFURSBUQUJMRSB1c2VycyAoXFxuICAgIHVzZXJfaWQgSU5UIE5PVCBOVUxMIEFVVE9fSU5DUkVNRU5UIFBSSU1BUlkgS0VZLFxcbiAgICB1c2VybmFtZSBWQVJDSEFSKDUwKSBOT1QgTlVMTCBVTklRVUUsXFxuICAgIGVtYWlsIFZBUkNIQVIoMTAwKSBOT1QgTlVMTCBVTklRVUUsXFxuICAgIHBhc3N3b3JkX2hhc2ggVEVYVCBOT1QgTlVMTCxcXG4gICAgbmFtZSBWQVJDSEFSKDUwKSBOT1QgTlVMTCxcXG4gICAgY2l0eSBWQVJDSEFSKDUwKSBOT1QgTlVMTFxcbik7XFxuXFxuLS0gVGFibGU6IHRyYW5zYWN0aW9uc1xcbkNSRUFURSBUQUJMRSB0cmFuc2FjdGlvbnMgKFxcbiAgICB0cmFuc2FjdGlvbl9pZCBJTlQgTk9UIE5VTEwgQVVUT19JTkNSRU1FTlQgUFJJTUFSWSBLRVksXFxuICAgIHVzZXJfaWQgSU5ULFxcbiAgICBzdG9yZV9pZCBJTlQsXFxuICAgIGVtcGxveWVlX2lkIElOVCxcXG4gICAgdHJhbnNhY3Rpb25fdGltZSBUSU1FU1RBTVAgTk9UIE5VTEwsXFxuICAgIGFtb3VudCBERUNJTUFMKDEwLCAyKSBOT1QgTlVMTCxcXG4gICAgRk9SRUlHTiBLRVkgKHVzZXJfaWQpIFJFRkVSRU5DRVMgdXNlcnModXNlcl9pZCksXFxuICAgIEZPUkVJR04gS0VZIChzdG9yZV9pZCkgUkVGRVJFTkNFUyBzdG9yZXMoc3RvcmVfaWQpLFxcbiAgICBGT1JFSUdOIEtFWSAoZW1wbG95ZWVfaWQpIFJFRkVSRU5DRVMgZW1wbG95ZWVzKGVtcGxveWVlX2lkKVxcbik7XFxuXFxuLS0gVGFibGU6IHRyYW5zYWN0aW9uX2l0ZW1zXFxuQ1JFQVRFIFRBQkxFIHRyYW5zYWN0aW9uX2l0ZW1zIChcXG4gICAgdHJhbnNhY3Rpb25faWQgSU5UIE5PVCBOVUxMLFxcbiAgICBib29rX2lkIElOVCBOT1QgTlVMTCxcXG4gICAgcXVhbnRpdHkgSU5UIE5PVCBOVUxMIENIRUNLIChxdWFudGl0eSA-IDApLFxcbiAgICBQUklNQVJZIEtFWSAodHJhbnNhY3Rpb25faWQsIGJvb2tfaWQpLFxcbiAgICBGT1JFSUdOIEtFWSAodHJhbnNhY3Rpb25faWQpIFJFRkVSRU5DRVMgdHJhbnNhY3Rpb25zKHRyYW5zYWN0aW9uX2lkKSxcXG4gICAgRk9SRUlHTiBLRVkgKGJvb2tfaWQpIFJFRkVSRU5DRVMgYm9va3MoYm9va19pZClcXG4pO1xcblxcbi0tIFRhYmxlOiBpbnZlbnRvcnlcXG5DUkVBVEUgVEFCTEUgaW52ZW50b3J5IChcXG4gICAgc3RvcmVfaWQgSU5UIE5PVCBOVUxMLFxcbiAgICBib29rX2lkIElOVCBOT1QgTlVMTCxcXG4gICAgcXVhbnRpdHkgSU5UIE5PVCBOVUxMIENIRUNLIChxdWFudGl0eSA-PSAwKSxcXG4gICAgUFJJTUFSWSBLRVkgKHN0b3JlX2lkLCBib29rX2lkKSxcXG4gICAgRk9SRUlHTiBLRVkgKHN0b3JlX2lkKSBSRUZFUkVOQ0VTIHN0b3JlcyhzdG9yZV9pZCksXFxuICAgIEZPUkVJR04gS0VZIChib29rX2lkKSBSRUZFUkVOQ0VTIGJvb2tzKGJvb2tfaWQpXFxuKTtcIiwgXCJjb21tZW50XCI6IFwiXCIsIFwiaXNfcmVsZXZhbnRcIjogdHJ1ZSwgXCJjYW5faW5mZXJfc2NoZW1hXCI6IHRydWV9In0.O1GXkyefXDUD-RVjR754vBt0qeSy5MYJ0FDKwTjmqMw";

function decryptKey() {
  if (!localStorage.getItem("contextKey")) {
    localStorage.setItem("contextKey", defaultJwt);
  }
  return JSON.parse(
    JSON.parse(
      atob(
        localStorage
          .getItem("contextKey")
          .split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    )["message"]
  );
}

export function updateContext() {
  let defaultData = decryptKey();
  contextInputArea.value = defaultData["build_commands"];
  // console.log(defaultData); // DON'T DELETE FOR FUTURE DEBUGGING
}

updateContext();

confirmContextBtn.addEventListener("click", () => {
  confirmContextBtn.disabled = true;
  console.log("CLICK");
  fetch("https://api.ipify.org?format=json")
    .then((resp) => {
      return resp.json();
    })
    .then((ip_json) => {
      return fetch("/api/openai/validate-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposedContext: contextInputArea.value,
          user: "user-001",
          addr: ip_json["ip"],
        }),
      });
    })
    .then((resp) => {
      return resp.json();
    })
    .then((json) => {
      localStorage.setItem("contextKey", json["token"]);
      let {
        build_commands,
        comment,
        is_relevant,
        can_infer_schema: is_inferred,
      } = decryptKey();
      if (is_relevant && is_inferred) {
        updateContext();
      } else {
        throw new TypeError("Your context is either unrelated or ambiguous.");
      }
    })
    .catch((e) => console.log(e))
    .finally(() => (confirmContextBtn.disabled = false));
});
