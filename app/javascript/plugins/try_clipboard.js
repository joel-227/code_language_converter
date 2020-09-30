function tryClipboard() {
  const copyButton = document.querySelector(".copy-logo");
  copyButton.addEventListener('click', copyClipboard)
}


async function copyClipboard() {
  const outputEditor = document.querySelectorAll('.CodeMirror')[1].CodeMirror;
  try {
      await navigator.clipboard.writeText(outputEditor.getValue());
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

export default tryClipboard;
