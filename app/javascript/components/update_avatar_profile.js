

function updateAvatarProfile() {
  const imagePlaceholder = document.querySelector('.avatar.mb-3');
  const imageInput = document.querySelector('#user_image_url');
  imageInput.addEventListener('input', (event) => {
    // get the value from the input
    fetch(imageInput.value)
      .then((res) => {
        if (res.status === 200) {
          imagePlaceholder.src = res.url;
        } else {
          imagePlaceholder.src = "https://image.flaticon.com/icons/png/512/103/103085.png";
        }
      })
      .catch(error => {
        console.log("in the error");
      })

    // fetch to the to the url
    // if the fetch works
    // replace the old placeholder
    // if it doesnt, throw an error
  })
};


export { updateAvatarProfile as updateAvatarProfile };
