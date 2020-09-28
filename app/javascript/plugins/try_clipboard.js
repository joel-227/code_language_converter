
function tryClipboard() {
  const copyButton = document.querySelector(".far.fa-copy.copy-logo.absolute");
  copyButton.addEventListener('click', copyClipboard)
}


async function copyClipboard() {
  const outputEditor = document.querySelectorAll('.CodeMirror')[1].CodeMirror;
  try {
      await navigator.clipboard.writeText(outputEditor.getValue());
      console.log('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

export { tryClipboard as tryClipboard };
