

const translate = () => {
   
    const button = document.querySelector('.submit-wrapper');
    const form = document.querySelector('form');
    const submit = new Event('submit');
    if (button) {
      button.addEventListener('click', (e) => {
          form.dispatchEvent(submit);
      })
    }
}


export { translate as translate};