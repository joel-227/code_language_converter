
// Select all the elements that have the like logo
import { csrfToken } from "@rails/ujs";


const addLike = () => {
  const likeButtons = document.querySelectorAll('.like-logo');
  likeButtons.forEach((like) => {
    like.addEventListener('click', upvote);
  })
}

const upvote = (event) => {
    console.log(event.target.dataset)
    const translationId = event.target.dataset.translationId

    fetch(`/translation/${translationId}/likes`, {
        method: 'POST',
        credential: "same-origin",
        headers: { "Accept": "application/json",
                   "Content-Type": "application/json",
                   "X-CSRF-Token": csrfToken() }
         }).then(response => response.json())
        .then(data => {
         // Need update the dom
         const likesNumber = event.target.nextElementSibling;
         likesNumber.innerText = `${data.likes} likes`;
        })

  // Go to the likes controller and add a like to a given
  // translation
}

export { addLike as addLike };


// For each like logo

// Add an event listener

// The event listener needs to do the following

// Whenever you click me,

