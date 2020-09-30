function tryClear() {
  const clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener('click', clear)
}


function clear() {
  const inputEditor = document.querySelector('.CodeMirror').CodeMirror;
  const outputEditor = document.querySelectorAll('.CodeMirror')[1].CodeMirror;
  inputEditor.setValue("");
  outputEditor.setValue("")
}

export default tryClear;