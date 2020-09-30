// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("packs/prism")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
//import Prism from 'prismjs';
// import * from 'prismjs/themes/prism.css'


// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
import conversion  from '../components/conversion.js';
import { addLike } from '../plugins/add_like.js';
import { activateClipboard } from '../plugins/activate_clipboard.js';
import { typeLanding } from '../plugins/type_landing.js';
import activateConversion from "../components/conversion.js";
import { translate } from '../plugins/translate.js';
// import { clearForm } from '../plugins/clear_form.js';


Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true,
  /*'break-lines': 80,
  'indent': 2,
  'remove-initial-line-feed': false,
  'tabs-to-spaces': 4,
  'spaces-to-tabs': 4*/
});


document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();

  activateClipboard();
  // tryClipboard();
  // tryClear();
  addLike();
  // typeLanding();
  translate();
  activateConversion();
  // clearForm();
  Prism.highlightAll();
});
