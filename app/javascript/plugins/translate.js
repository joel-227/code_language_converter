

const translate = () => {
   
    const button = document.querySelector('.submit-wrapper');
    const form = document.querySelector('form');
    const submit = new Event('submit');
    
    button.addEventListener('click', (e) => {
        form.dispatchEvent(submit);
    })
}


export { translate as translate};