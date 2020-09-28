

const clearForm = () => {
    const inputForm = document.querySelector('#input');
    const clearButton = document.querySelector('.clear-button');

    clearButton.addEventListener('click', () => {
        inputForm.value = "";
    })
}

export { clearForm as clearForm };