

function updateAvatarProfile() {
  let regex = RegExp("users/edit");
  if (regex.test(window.location.href)) {
    const noAvatarPlaceholder = document.querySelector('.no-avatar');
    const imagePlaceholder = document.querySelector('.avatar-dynamic.avatar.mb-3');
    const imageInput = document.querySelector('#user_image_url');
    imageInput.addEventListener('input', (event) => {
      fetch(imageInput.value)
        .then((res) => {
          if (res.status === 200 && imagePlaceholder) {
            imagePlaceholder.src = res.url;
          } else if (res.status === 200 && noAvatarPlaceholder) {
            console.log("res is 200");
            noAvatarPlaceholder.innerHTML = `<img class="avatar-dynamic avatar mb-3" src="${res.url}">`
          } else if (imagePlaceholder) {
            imagePlaceholder.src = "https://www.iconfinder.com/data/icons/hosting-glyphs/60/error__attack__dos_404_-512.png";
          } else {
            noAvatarPlaceholder.innerHTML =`<img class="avatar mb-3" src="https://www.iconfinder.com/data/icons/hosting-glyphs/60/error__attack__dos_404_-512.png">`;
          }
        })
        .catch(error => {
          console.log(error);
        })
    })
  }
};


export { updateAvatarProfile as updateAvatarProfile };
