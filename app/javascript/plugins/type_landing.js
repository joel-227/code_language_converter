
import Typed from 'typed.js';


const typeLanding  = () => {
  let rubyOptions = {
  strings: ['<p class="text-light"> why you so buggy </p>',
            '<span class="ruby-code keyword">class</span> <span class="ruby-code class">Square</span>\n  <span class="ruby-code keyword">def</span> <span class="ruby-code method">get_area</span>(size)\n    size <span class="ruby-code operator">* </span>size\n  <span class="ruby-code keyword">end</span>\n<span class="ruby-code keyword">end</span>'
            ],
  typeSpeed: 40,
  }
  try {
    new Typed('.ruby-typed', rubyOptions)
  } catch(error) {
    console.warn("Type JS Not Loaded - See type_landing.js for details");
  }
  


  let jsOptions = {
      strings: ['why you so buggy',
            '<span class="ruby-code keyword">class</span> <span class="ruby-code class">Square { </span>\n<span class="ruby-code keyword">  function</span> <span class="ruby-code method">getArea</span>(size) {\n    return size <span class="ruby-code operator">* </span>size;\n  }\n}'
            ],
  typeSpeed: 40,
  }

  try {
    new Typed('.js-typed', jsOptions)
  } catch(error) {
    console.warn("Type JS Not Loaded - See type_landing.js for details");
  }
  
}


export { typeLanding as typeLanding };
