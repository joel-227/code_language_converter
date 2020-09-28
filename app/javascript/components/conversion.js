import CodeMirror from "codemirror";

const conversion = () => {
  const form = document.getElementById('form');
  const output = document.getElementById('output');
  const inputField = document.getElementById('input');
  let inputEditor = CodeMirror.fromTextArea(inputField, {
    lineNumbers: true
  })
  let outputEditor = CodeMirror.fromTextArea(output, {
    lineNumbers: true
  })



  const variableList = [];
  const functionParamList = [];
  const blockList = [];
  const objectList = [];
  const functionList = [];
  const instanceVariableList = [];
  let isIfInOneLine = false;
  let isInHash = false;

  class Keyword {
    constructor(keyword, convertedWord, aInput, isWord) {
      this.keyword = keyword;
      this.convertedWord = convertedWord;
      this.input = aInput;
      this.isWord = isWord;
    }

    lineDoesNotContainString() {
      return !(this.input.includes('"') || this.input.includes("'"));
    }

    isInString(matchStringZero) {
      let quotationIndex = this.input.indexOf(matchStringZero);
      let quotationCounter = 0;
      for (let i = 0; i < quotationIndex; i++) {
        if (this.input[i] === matchStringZero[0]) {
          quotationCounter += 1
        }
      }
      if (quotationCounter % 2 === 0) {
        return true;
      }
      return false;
    }
    
    getKeyWord() {
      // fix this function
      let matchString;
      let originalWords = [];
      let tempWords = [];
      let counter = 0;
      let elseCounter = 0;
      let whileCounter = 0;
      while ((matchString = new RegExp(`(")([^"]*\\s*)(${this.keyword})(\\s*[^"]*)(")`, 'g').exec(this.input)) || (matchString = new RegExp(`(')([^']*\\s*)(${this.keyword})(\\s*[^']*)(')`, 'g').exec(this.input))) {
        if (this.isInString(matchString[0])) {
          originalWords.push(matchString[0])
          this.input = this.input.replace(matchString[0], `woah${counter}`);
          tempWords.push(`woah${counter}`);
          counter += 1;
        } else {
          this.input = this.input.replace(matchString[0], `${matchString[1]}${matchString[2]}${this.convertedWord}${matchString[4]}${matchString[5]}`);
          elseCounter += 1;
        }
        whileCounter += 1;
      }
      if (counter > 0 && elseCounter !== whileCounter) {
        const regex = new RegExp(`${this.keyword}`, "g");
        this.input = this.input.replace(regex, `${this.convertedWord}`);
        for (let i = 0; i < originalWords.length; i++) {
          this.input = this.input.replace(tempWords[i], originalWords[i]);
        }
      }
      return this.input;
    }

    result() {
      let regex;
      if (this.isWord) {
        regex = new RegExp(`\\b${this.keyword}\\b`, "g");
      } else {
        regex = new RegExp(`\\B${this.keyword}\\B`, "g");
      }
      let match;
      if (match = regex.exec(this.input)) {
        if (this.lineDoesNotContainString()) {
          this.input = this.input.replace(regex, `${this.convertedWord}`);
        } else {
          this.input = this.getKeyWord();
        }
      }
      return this.input
    }
  }

  const getResult = (regex, aInput, output) => {
    let match = regex.exec(aInput);
    if (match) {
      aInput = aInput.replace(regex, output(match))
    }
    return aInput;
  }

  const getPutsToConsoleLog = (aInput) => {
    const regex = /^(\s*)puts (.*)$/g;
    return getResult(regex, aInput, (match) => `${match[1]}console.log(${match[2]})`);
  }

  const getAllToEvery = (aInput) => {
    // need to revise
    const regex = /^(\s*)(.*).all\?$/g;
    return getResult(regex, aInput, (match) => `${match[2]}.every()`);
  }
  const getIncludeToIncludes = (aInput) => {
    const regex = /^(\s*)(.*).include\?\((.*)\)$/g;
    return getResult(regex, aInput, (match) => `${match[2]}.includes(${match[3]})`);
  }
  const getFirst = (aInput) => {
    const regex = /^(\s*)(\w+).first$/g;
    return getResult(regex, aInput, (match) => `${match[2]}[0]`);
  }
  const getFirstN = (aInput) => {
    const regex = /^(\s*)(\w+).first\((.*)\)$/g;
    return getResult(regex, aInput, (match) => `${match[2]}.slice(0, ${match[3]})`);
  }
  const getLast = (aInput) => {
    const regex = /^(\s*)(\w+).last$/g;
    return getResult(regex, aInput, (match) => `${match[2]}[${match[2]}.length - 1]`);
  }
  const getLastN = (aInput) => {
    const regex = /^(\s*)(\w+).last\((.*)\)$/g;
    return getResult(regex, aInput, (match) => `${match[2]}.slice(-${match[3]})`);
  }
  const getClassToTypeOf = (aInput) => {
    const regex = /(\s*)(\S*|".*"\S*|'.*'\S*|\w+\(.+\))\.class\s*/g;
    return getResult(regex, aInput, (match) => `${match[1]}typeof(${match[2]})`);
  }
  const getToInt = (aInput) => {
    const regex = /(\s*)(".*"|'.*'|\S*|\[.*\])\.to_i\s*/g;
    return getResult(regex, aInput, (match) => `${match[1]}parseInt(${match[2]}, 10)`);
  }
  const getZeroToNExclusiveArray = (aInput) => {
    const regex = /^(\s*)\(0...(.*)\).to_a$/g;
    return getResult(regex, aInput, (match) => `Array.apply(null, {length: ${match[2]}}).map(Function.call, Number)`);
  }
  const getToS = (aInput) => {
    const regex = /(\s*)(".*"|'.*'|\S*)\.to_s\s*/g;
    return getResult(regex, aInput, (match) => `${match[1]}(${match[2]}).toString()`);
  }
  const getDestructiveReverse = (aInput) => {
    const regex = /^(\s*)(\w+).reverse!$/g;
    return getResult(regex, aInput, (match) => `${match[2]} = ${match[2]}.splice(0, ${match[2]}.length, ${match[2]}.reverse())`);
  }
  const getZeroToNInclusiveArray = (aInput) => {
    const regex = /^(\s*)\(0..(.*)\).to_a$/g;
    return getResult(regex, aInput, (match) => `Array.apply(null, {length: ${match[2]} + 1}).map(Function.call, Number)`);
  }
  const getSample = (aInput) => {
    const regex = /(\s*)(".*"|'.*'|\S*|\[.*\])\.sample[\(\)]*\s*/g;
    return getResult(regex, aInput, (match) => `${match[1]}${match[2]}[Math.floor(Math.random() * ${match[2]}.length)]`);
  }

  const getCorrectConvention = (matchTwo) => {
    const underscoreRegex = /_/g;
    let lowerCaseResetCounter = true;
    let underscoreMatch;
    while (underscoreMatch = underscoreRegex.exec(matchTwo)) {
      if (lowerCaseResetCounter) {
        matchTwo = matchTwo.toLowerCase();
        lowerCaseResetCounter = false;
      }
      let underscoreIndex = underscoreMatch.index;
      // matchTwo = matchTwo.replace(matchTwo[underscoreIndex + 1], matchTwo[underscoreIndex + 1].toUpperCase());
      let charArray = matchTwo.split("");
      charArray[underscoreIndex + 1] = charArray[underscoreIndex + 1].toUpperCase();
      matchTwo = charArray.join("");
      matchTwo = matchTwo.replace("_", "");
    }
    if (lowerCaseResetCounter === false) {
      return matchTwo;
    } else {
      return matchTwo.toLowerCase();
    }
  }

  const getVariableDefinition = (aInput) => {
    const regex = /(\s*)(\w+)\s*(=)\s*([^=].+)/g;
    let match = regex.exec(aInput);
    if (match && !variableList.includes(match[2]) && !functionParamList.includes(match[2]) && !objectList.includes(match[2]) && !functionList.includes(match[2]) && !instanceVariableList.includes(match[2])) {
      variableList.push(match[2]);
      variableList.push(getCorrectConvention(match[2]));
      if (match[2].toUpperCase() === match[2]) {
        // the variable is a constant
        match[2] = getCorrectConvention(match[2]);
        aInput = aInput.replace(regex, `${match[1]}const ${match[2]} = ${match[4]}`);     
      } else {
        match[2] = getCorrectConvention(match[2]);
        aInput = aInput.replace(regex, `${match[1]}let ${match[2]} = ${match[4]}`);
      }
    }
    return aInput;

    // if variable name has underscore, delete it, make next letter uppercase if possible
    
    
    // (done) check if variable name has 52 alp, 10 digits, underscore, NO whitespace, NO dashes (maybe use \w)
    // (done) if variable name has been called before, don't regenerate it
    // (done) if variable name === allCaps, then use const, otherwise let
  }

  const getVariable = (aInput) => {
    // possible characters:
    // A - Z
    // a - z
    // 0 - 9
    // underscore
    // whitespace(\t, " ", \n, end_of_line)  (yes)
    // brackets({}, (), [], <>) (yes)
    // punctuation(,  .  :  ;  " ' ?  /  |  \) (only dot, colon, semi-colon and ?)
    // operation(+ = -) (yes)
    // other(! @ # $ % ^ & * ` ~)   (only !, @ if in front)
    
    // variableList = ["my_array", "numbers"]

    const regex = /(\w+)/g;
    const words = aInput.match(regex);
    if (words) {
      words.forEach((word) => {
        if (variableList.includes(word)) {
          // word = my_array
          const regexString = "(\\s*)(|[\\(\\)\\{\\}\\[\\]\\<\\>]|[\\.\\:\\;\\?]|[+-=!]|puts[\\s|\\(])(" + word + ")(\\s+|$|[\\(\\)\\{\\}\\[\\]\\<\\>]|[\\.\\:\\;\\?]|[+-=!])";
          const regexTwo = new RegExp(regexString, 'g');
          let match = regexTwo.exec(aInput);
          if (match) {
            let correctedWord = getCorrectConvention(match[3]);
            aInput = aInput.replace(match[3], correctedWord)
          }
        }
      });
    }

    return aInput

  }

  const getPowertoPow = (aInput) => {
    // change a ** b to Math.pow(a, b)
    const regex = /^(\s*)(.*)(\s*)\*\*(\s*)(.*)$/g;
    let match;
    while (match = regex.exec(aInput)) {
      aInput = aInput.replace(match[0], `Math.pow(${match[2]}, ${match[5]})`);
    }
    return aInput;
  }

  const getLastElement = (aInput) => {
    // change variable_name[-1] to variable_name[variableName.length - 1]
    let match;
    const regex = /(\w+)\[\s*-\s*(\d+)\s*\]/g;
    while (match = regex.exec(aInput)) {
      aInput = aInput.replace(match[0], `${match[1]}[${match[1]}.length - ${match[2]}]`);
    }
    return aInput;
  }

  const getSubString = (aInput) => {
    // change variable_name[1...5] to variable_name.substring(1, 5)
    const regexOne = /(\w+)\[\s*(\d+)\s*\.\.\.\s*(\d*)\s*\]/g;
    let match;
    while (match = regexOne.exec(aInput)) {
      if (parseInt(match[3], 10) > parseInt(match[2], 10)) {
        let result = match[3].match(/\d+/g);
        if (result) {
          aInput = aInput.replace(match[0], `${match[1]}.substring(${match[2]}, ${match[3]})`);
        } else {
          aInput = aInput.replace(match[0], `${match[1]}.substring(${match[2]})`);
        }
      } else {
        aInput = aInput.replace(match[0], `${match[1]}.substring(${match[2]}, ${match[2]})`);
    }
  }
  const regexTwo = /(\w+)\[\s*(\d+)\s*\.\.\s*(\d*)\s*\]/g;
    while (match = regexTwo.exec(aInput)) {
      if (parseInt(match[3], 10) >= parseInt(match[2], 10)) {
        let result = match[3].match(/\d+/g);
        if (result) {
          aInput = aInput.replace(match[0], `${match[1]}.substring(${match[2]}, ${parseInt(match[3], 10) + 1})`);
        } else {
          aInput = aInput.replace(match[0], `${match[1]}.substring(${match[2]})`);
        }
      } else {
        aInput = aInput.replace(match[0], `${match[1]}.substring(${match[2]}, ${match[2]})`);
      }
    }
    return aInput;
  }

  const getToUpperCase = (aInput) => {
    // converts variable_name.upcase   to   variable_name.toUpperCase()
    const regex = /(\s*)(\S*|".*"\S*|'.*'\S*)\.upcase\s*/g;
    return getResult(regex, aInput, (match) => `${match[1]}${match[2]}.toUpperCase()`);
  }

  const getToLowerCase = (aInput) => {
    // converts variable_name.upcase   to   variable_name.toUpperCase()
    const regex = /(\s*)(\S*|".*"\S*|'.*'\S*)\.downcase\s*/g;
    return getResult(regex, aInput, (match) => `${match[1]}${match[2]}.toLowerCase()`);
  }

  const getInterpolation = (aInput) => {
    const regex = /#{([^}]*)}/g;
    let match;
    while (match = regex.exec(aInput)) {
      aInput = aInput.replace(match[0], "${" + match[1] + "}");
      aInput = aInput.replace(/"/g, "`");
    }
    return aInput;
  }

  const getPush = (aInput) => {
    const regex = /(\s*)(\w+)\s*<<\s+(.+)/g;
    return getResult(regex, aInput, (match) => `${match[1]}${match[2]}.push(${match[3]})`);
  }

  const getThis = (aInput) => {
    const regex = /(\s*)\@(\w+)/g;
    let match = regex.exec(aInput);
    if (match) {
      instanceVariableList.push(match[2]);
      let matchTwo = getCorrectConvention(match[2]);
      instanceVariableList.push(matchTwo);
      aInput = aInput.replace(regex, `${match[1]}this.${matchTwo}`);
    }
    return aInput;
  }

  const getSplice = (aInput) => {
    const regex = /(\s*)(\w+)\.delete_at\(\s*(\d+)\s*\)/g;
    return getResult(regex, aInput, (match) => `${match[1]}${match[2]}.splice(${match[3]}, 1)`);
  }

  const getForEach = (aInput) => {
    const regex = /(\s*)(\w+).each do \|(\w+)\|/g;
    let match;
    while (match = regex.exec(aInput)) {
      functionParamList.push(match[3]);
      blockList.push("{(")
      aInput = aInput.replace(regex, `${match[1]}${match[2]}.forEach((${match[3]}) => {`)
    }
    return aInput;
  }

  const getReduce = (aInput) => {
    const regex = /^(\s*)(.*).reduce(\s*)({|do)(\s*)\|(.*)\|(\s*)(.*)(\s)(}|end)/g;
    let match;
    while (match = regex.exec(aInput)) {
      functionParamList.push(match[6]);
      // array.reduce((sum, current) => sum + current);
      aInput = aInput.replace(regex, `${match[1]}${match[2]}.reduce((${match[6]}) => ${match[8]})`)
    }
    return aInput;
  }

  const getMap = (aInput) => {
    const regex = /^(\s*)(.*).map(\s*)({|do)(\s*)\|(.*)\|(\s*)(.*)\s(}|end)/g;
    let match;
    while (match = regex.exec(aInput)) {
      functionParamList.push(match[6]);
      // array.map(function(item) { return item * 2 });
      aInput = aInput.replace(regex, `${match[1]}${match[2]}.map(function(${match[6]}) { return ${match[8]} })`)
    }
    return aInput;
  }
  
  const getSelect = (aInput) => {
    const regex = /^(\s*)(.*).select(\s*)({|do)(\s*)\|(.*)\|(\s*)(.*)(\s*)(}|end)/g;
    let match;
    while (match = regex.exec(aInput)) {
      functionParamList.push(match[6]);
      // array.filter(function(num){ return num % 2 != 0 });
      aInput = aInput.replace(regex, `${match[1]}${match[2]}.filter(function(${match[6]}) { return ${match[8]} })`)
    }
    return aInput;
  }

  const getFind = (aInput) => {
    const regex = /^(\s*)(.*).find(\s*)({|do)(\s*)\|s(.*)\|(\s*)(.*)(}|end)/g;
    let match;
    while (match = regex.exec(aInput)) {
      functionParamList.push(match[6]);
      // array.find(a => a > 2)
      aInput = aInput.replace(regex, `${match[1]}${match[2]}.find( ${match[6]} => ${match[8]} )`)
    }
    return aInput;
  }

  const getEndToBracket = (aInput) => {
    let myResult = new Keyword("end", "end", aInput, true);
    if (myResult.lineDoesNotContainString()) {
      const regex = /(\s*)end/g;
      let match;
      while (match = regex.exec(aInput)) {
        if (blockList[blockList.length - 1] == "{(") {
          aInput = aInput.replace(regex, `${match[1]}})`);
        } else {
          aInput = aInput.replace(regex, `${match[1]}}`);
        }
        blockList.pop();
      }
      return aInput
    } else {
      return myResult.result();
    }

  }

  const getReturnOneLineIf = (aInput) => {
    const regex = /(return)(.+)\s+(if )(.+)/g;
    let match;
    if (match = regex.exec(aInput)) {
      aInput = aInput.replace(regex, `${match[3]}(${match[4]}) ${match[1]}${match[2]}`);
      isIfInOneLine = true;
    }
    return aInput
  }

  const getIf = (aInput) => {
    if (!isIfInOneLine) {
      let myResult = new Keyword("if", "if", aInput, true)
      const regex = /(\s*)\b(if |while )(.+)/g;
      let matchString;
      let match;
      if ((matchString = new RegExp(`(")([^"]*\\s*)(${myResult.keyword})(\\s*[^"]*)(")`, 'g').exec(myResult.input)) || (matchString = new RegExp(`(')([^']*\\s*)(${myResult.keyword})(\\s*[^']*)(')`, 'g').exec(myResult.input))) {
        if (myResult.isInString(matchString[0])) {
          return aInput;
        }
      }
      if (match = regex.exec(aInput)) {
        blockList.push("{")
        aInput = aInput.replace(regex, `${match[1]}${match[2]}(${match[3]}) {`);
      }
    } else {
      isIfInOneLine = false;
    }
    return aInput;
  }

  const getElse = (aInput) => {
    let myResult = new Keyword("else", "else", aInput, true)
    const regex = /(\s*)(else)(\s*)/g;
    let matchString;
    let match;
    if ((matchString = new RegExp(`(")([^"]*\\s*)(${myResult.keyword})(\\s*[^"]*)(")`, 'g').exec(myResult.input)) || (matchString = new RegExp(`(')([^']*\\s*)(${myResult.keyword})(\\s*[^']*)(')`, 'g').exec(myResult.input))) {
      if (myResult.isInString(matchString[0])) {
        return aInput;
      }
    }
    if (match = regex.exec(aInput)) {
      aInput = aInput.replace(regex, `${match[1]}} ${match[2]} {`)
    }
    return aInput;
  }

  const getElseIf = (aInput) => {
    const regex = /(\s*)(elsif )(.+)/g;
    let match;
    if (match = regex.exec(aInput)) {
      aInput = aInput.replace(regex, `${match[1]}} else if (${match[3]}) {`);
    }
    return aInput;
  }

  const getConditional = (aInput) => {
    let myResult = new Keyword("==", "===", aInput, false);
    return myResult.result();
  }

  const getAnd = (aInput) => {
    let myResult = new Keyword("and", "&&", aInput, true);
    return myResult.result();
  }

  const getOr = (aInput) => {
    let myResult = new Keyword("or", "||", aInput, true);
    return myResult.result();
  }

  const getNilToUndefined = (aInput) => {
    let myResult = new Keyword("nil", "undefined", aInput, true);
    return myResult.result();
  }

  const getHashToObject = (aInput) => {    
    const regex = /(\s*)(\w+)\s*=\s*{/g;
    let match;
    if (match = regex.exec(aInput)) {
      objectList.push(match[2]);
      aInput = aInput.replace(regex, `${match[1]}const ${match[2]} = {`);
    }
    return aInput;
  }

  const getHashKeyValue = (aInput) => {
    // hash keys are strings
    // const regex = /(\s*)"(\w+)"\s*=>\s*(.+)/g;
    // if (match = regex.exec(aInput)) {
      // aInput = aInput.replace(regex, `${match[1]}${match[2]}: ${match[3]}`)
      // if (match[3][0] === "{") {
    // backup_regex = "(\w+)"\s*=>\s*("[^"]*"|'[^']*'|\[[^]]+\]|\d+\.\d+|\d+|\w+)
    isInHash = false;
    let match;
    while (match = /("\w+"|:\w+)\s*=>\s*/g.exec(aInput)) {
      isInHash = true;
      let key = /(\w+)/g.exec(match[1]);
      aInput = aInput.replace(match[0], `${key[1]}: `);
    }
      // }
    // }
    return aInput;
  }

  const getCallHash = (aInput) => {
    let match;
    while (match = /\[:(\w+)\]/g.exec(aInput)) {
      aInput = aInput.replace(match[0], `.${match[1]}`);
    }
    return aInput
  }

  const getFunctionDefinition = (aInput) => {
    // fix implicit return
    const regex = /def (\w+)(\([^\)]*\))?/g;
    let match;
    if (match = regex.exec(aInput)) {
      functionList.push(match[1]);
      let matchOne = getCorrectConvention(match[1]);
      functionList.push(matchOne);
      blockList.push("{");
      if (match[2]) {
        aInput = aInput.replace(match[0], `const ${matchOne} = ${match[2]} => {`);
      } else {
        aInput = aInput.replace(match[0], `const ${matchOne} = () => {`);
      }
    }
    return aInput;
  }

  const getFunctionCall = (aInput) => {
    const regex = /(\w+)(\([^\)]*\))*/g;
    let match;
    while (match = regex.exec(aInput)) {
      if (functionList.includes(match[1])) {
        let matchOne = getCorrectConvention(match[1]);
        aInput = aInput.replace(match[0], `${matchOne}${match[2]}`);
      }
    }
    return aInput;
  }

  const getEmptytoLength = (aInput) => {
    // change variable_name.empty? to variable_name.length==0
    const regex = /^(\s*)(.*).empty\?$/g;
    let match;
    while (match = regex.exec(aInput)) {
      aInput = aInput.replace(match[0], `${match[2]}.length == 0`);
    }
    return aInput;
  }

  const getSemiColon = (aInput) => {
    let tempInput = aInput.trim();
    if (isInHash) return aInput;
    if (['{', '}', ','].includes(tempInput[tempInput.length - 1]) || aInput.length === 0) {
      return aInput;
    }
    return aInput + ';';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('input').value;
    output.value = "";
    const lines = input.split("\n");
    lines.forEach((input, index) => {
      input = getConditional(input);
      input = getFunctionCall(input);
      input = getFunctionDefinition(input);
      input = getToUpperCase(input);
      input = getToLowerCase(input);
      input = getPush(input);
      input = getSplice(input);
      input = getEmptytoLength(input);
      input = getInterpolation(input);
      input = getToInt(input);
      input = getSample(input);
      input = getClassToTypeOf(input);
      input = getFirst(input);
      input = getFirstN(input);
      input = getLastN(input);
      input = getLast(input);
      input = getToS(input);
      input = getLastElement(input);
      input = getSubString(input);
      input = getThis(input);
      input = getHashToObject(input);
      input = getHashKeyValue(input);
      input = getCallHash(input);
      input = getVariable(input);
      input = getVariableDefinition(input);
      input = getPutsToConsoleLog(input);
      input = getAllToEvery(input);
      input = getIncludeToIncludes(input);
      input = getEndToBracket(input);
      input = getForEach(input);
      input = getReduce(input);
      input = getMap(input);
      input = getSelect(input);
      input = getFind(input);
      input = getReturnOneLineIf(input);
      input = getIf(input);
      input = getPowertoPow(input);
      input = getElse(input);
      input = getElseIf(input);
      input = getAnd(input);
      input = getOr(input);
      input = getZeroToNInclusiveArray(input);
      input = getZeroToNExclusiveArray(input);
      input = getDestructiveReverse(input);
      input = getNilToUndefined(input);
      input = getSemiColon(input);
      // output.insertAdjacentHTML('beforeend', `<p>${input}</p>`);
      index === lines.length - 1 ? output.value +=  `${input}` : output.value +=  `${input}\n`;
      outputEditor.getDoc().setValue(output.value);
    });
    variableList.length = 0;
    functionParamList.length = 0;
    blockList.length = 0;
    objectList.length = 0;
    functionList.length = 0;
    instanceVariableList.length = 0;
  });


  const testInput = document.getElementById('input');
  document.addEventListener('keyup', (event) => {
    if (event.key === "F2") {
      testInput.value = `puts "hello world"`;
      inputEditor.getDoc().setValue(testInput.value);
    }
    if (event.key == "F4") {
      testInput.value = `numbers = [1, 2, 3, 4, 5]\nnumbers.each do |number|\n  if number % 2 == 0\n    puts "Number: #{number} is even!"\n  end\nend`;
      inputEditor.getDoc().setValue(testInput.value);
    }
    if (event.key === "F7") {
      testInput.value = `random_number = [1, 2, 3].sample\nif random_number == 1\n  puts "one"\nelsif random_number == 2\n  puts "two"\nelse\n  puts "three"\nend`;
      inputEditor.getDoc().setValue(testInput.value);
    }
  });
}


const activateConversion = () => {
  const form = document.getElementById('form');
  if (form) {
    conversion();
  }
}

export default activateConversion