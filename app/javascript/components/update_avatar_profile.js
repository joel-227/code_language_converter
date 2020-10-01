

function updateAvatarProfile() {
  let regex = RegExp("users/edit");
  if (regex.test(window.location.href)) {
    const imagePlaceholder = document.querySelector('.avatar.mb-3');
    const imageInput = document.querySelector('#user_image_url');
    imageInput.addEventListener('input', (event) => {
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
    })
  }
};


export { updateAvatarProfile as updateAvatarProfile };
