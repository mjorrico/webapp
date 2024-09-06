export const tx = document.querySelector("#myTextarea");
tx.setAttribute("style", "height:" + (tx.scrollHeight) + "px; overflow-y: hidden");
tx.addEventListener("input", onTextareaInput, false)

export function onTextareaInput(){
    // check https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    this.style.height = "auto";
    this.style.height = Math.min(100, this.scrollHeight) + "px";

    if (this.scrollHeight > 100) {
        this.style.overflowY = "scroll";
    } else {
        this.style.overflowY = "hidden";
    }
}