import CodeMirror from "codemirror";
import "codemirror/mode/ruby/ruby.js"


const codemirrorTranslationRequests = () => {
  const requestForm = document.getElementById('translation_request_content');
  if (requestForm) {
    CodeMirror.fromTextArea(requestForm, {
      lineNumbers: true,
      mode: "ruby",
      theme: "monokai",
      height: "300px",
      borderRadius: "20px",
      margin: "10px 0"
    })
  }
}

export default codemirrorTranslationRequests;