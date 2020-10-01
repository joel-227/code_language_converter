import CodeMirror from "codemirror";
import "codemirror/mode/ruby/ruby.js"
import "codemirror/mode/javascript/javascript.js"


const codeMirrorNotPresentIn = (nodeList) => {
  const codeMirror = nodeList.find((el) => { return el.classList.contains('CodeMirror') })
  if (!codeMirror) {
    return true;
  } else {
    return false;
  }
}

const codemirrorTranslationRequests = () => {
  const requestForm = document.getElementById('translation_request_content');
  // if requestForm is there && requestForm is not a codeMirror already
  const requestFormChildren = [...requestForm.children];
  if (requestForm && codeMirrorNotPresentIn(requestFormChildren)) {
    CodeMirror.fromTextArea(requestForm, {
      lineNumbers: true,
      mode: "ruby",
      theme: "monokai"
    })
    const styleForm = document.querySelector('.CodeMirror.cm-s-monokai');
    styleForm.classList.add('codemirror-translation-request-form');
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
