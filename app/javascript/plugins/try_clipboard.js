function tryClipboard() {
  const copyButton = document.querySelector(".copy-logo-home");
  if (copyButton) {
    copyButton.addEventListener('click', copyClipboard)
  }
}

const getValueExceptOutput = (input) => {
  // input = def square(x)\n  return x * x\nend\n\n# Output\n# something
  const regex = /\n\n\/\/ Output:.*/gs;
  let match;
  if (match = regex.exec(input)) {
    input = input.replace(match[0], "");
  }
  return input;
}

async function copyClipboard() {
  const outputEditor = document.querySelectorAll('.CodeMirror')[1].CodeMirror;
  try {
    await navigator.clipboard.writeText(getValueExceptOutput(outputEditor.getValue()));
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export default tryClipboard;
