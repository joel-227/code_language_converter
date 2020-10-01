import CodeMirror from "codemirror";
import "codemirror/mode/ruby/ruby.js"
import "codemirror/mode/javascript/javascript.js"


const codeMirrorInRequestForm = (nodeList) => {
  const codeMirror = nodeList.find((el) => { return el.classList.contains('CodeMirror') })
  if (codeMirror) {
    return false;
  } else {
    return true;
  }
}

const codemirrorTranslationRequests = () => {
  const formForCodeMirror = document.getElementById('translation_request_content');
  const requestForm = document.querySelector('.translation_request_content');
  // if requestForm is there && requestForm is not a codeMirror already
  if (formForCodeMirror) {
    const requestFormChildren = [...requestForm.children];
    if (codeMirrorInRequestForm(requestFormChildren)) {
      console.log("CodeMirror apparently noy here");
      CodeMirror.fromTextArea(formForCodeMirror, {
        lineNumbers: true,
        mode: "ruby",
        theme: "monokai"
      })
      const styleForm = document.querySelector('.CodeMirror.cm-s-monokai');
      styleForm.classList.add('codemirror-translation-request-form');
    }
  }

  const contentForm = document.getElementById('translation_content');
  if (contentForm) {
    let contentEditor = CodeMirror.fromTextArea(contentForm, {
      lineNumbers: true,
      mode: "javascript",
      theme: "monokai"
    })
    const styleForm = document.querySelector('.CodeMirror.cm-s-monokai');
    styleForm.classList.add('codemirror-translation-request-form');
    contentEditor.getDoc().setValue('// Code here');
  }
}

export default codemirrorTranslationRequests;
