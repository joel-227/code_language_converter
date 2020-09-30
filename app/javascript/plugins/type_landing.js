
import Typed from 'typed.js';


const typeLanding  = () => {
  let rubyOptions = {
  strings: ['<p class="text-light"> why you so buggy </p>',
            '<span class="ruby-code keyword">class</span> <span class="ruby-code class">Square</span>\n  <span class="ruby-code keyword">def</span> <span class="ruby-code method">get_area</span>(size)\n    size <span class="ruby-code operator">* </span>size\n  <span class="ruby-code keyword">end</span>\n<span class="ruby-code keyword">end</span>'
            ],
  typeSpeed: 40,
  }
  new Typed('.ruby-typed', rubyOptions)


  let jsOptions = {
      strings: ['why you so buggy',
            '<span class="ruby-code keyword">class</span> <span class="ruby-code class">Square { </span>\n<span class="ruby-code keyword">  function</span> <span class="ruby-code method">getArea</span>(size) {\n    return size <span class="ruby-code operator">* </span>size;\n  }\n}'
            ],
  typeSpeed: 40,
  }

  new Typed('.js-typed', jsOptions)
}


export { typeLanding as typeLanding };
