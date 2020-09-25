//

const activateClipboard = () => {
  console.log("Activating the clipboard");
  console.log(ClipboardJS);
  new ClipboardJS('.copy-logo');
}

export { activateClipboard as activateClipboard };

