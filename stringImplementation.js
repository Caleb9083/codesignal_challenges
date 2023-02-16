const numbersToWords = (n) => {
  var string = n.toString(),
    units,
    tens,
    scales,
    start,
    end,
    chunks,
    chunksLen,
    chunk,
    ints,
    i,
    word,
    words;

  var and = "";

  /* Is number zero? */
  if (parseInt(string) === 0) {
    return "Zero";
  }

  /* Array of units as words */
  units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  /* Array of tens as words */
  tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  /* Array of scales as words */
  scales = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quatttuor-decillion",
    "Quindecillion",
    "Sexdecillion",
    "Septen-decillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Centillion",
  ];

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return "";
  }

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {
    chunk = parseInt(chunks[i]);

    if (chunk) {
      /* Split chunk into array of individual integers */
      ints = chunks[i].split("").reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word);
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word);
      }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(word + " Hundred");
      }
    }
  }

  return words.reverse().join(" ");
};
//console.log(numbersToWords("123"));

const encrypting = (plaintext, keyword, row, column) => {
  let alpha = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  keywordArr = keyword.split("");
  alphaWithoutKeyword = alpha.filter((el) => {
    return !keywordArr.includes(el);
  });
  concatingArr = keywordArr.concat(alphaWithoutKeyword);
  lastEl = concatingArr.pop();
  let polybius = [];
  for (let i = 0; i < 5; i++) {
    polybius.push(["0", "0", "0", "0", "0"]);
  }
  let count = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      polybius[i][j] = concatingArr[count];
      count++;
    }
  }
  polybius[row - 1][column - 1] += lastEl;

  let encodingArr = [];
  let plaintextArr = plaintext.split("");

  if (plaintextArr.length < keywordArr.length) {
    let filling = keywordArr.length - plaintextArr.length;
    for (let i = 0; i < filling; i++) {
      plaintextArr.push("0");
    }
  }

  for (let i = 0; i < plaintextArr.length; i++) {
    encodingArr.push(keywordArr[i % keywordArr.length]);
  }

  //let plainEncod = [encodingArr, plaintextArr];

  let myEncodingArr = encodingArr.map((el) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (polybius[i][j].includes(el)) {
          return parseInt(`${i + 1}${j + 1}`);
        }
      }
    }
  });

  let myEncodingPlainArr = plaintextArr.map((el) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (polybius[i][j].includes(el)) {
          return parseInt(`${i + 1}${j + 1}`);
        }
      }
    }
  });

  //let encodedFormats = [myEncodingArr, myEncodingPlainArr];
  let encodedFormat = [];
  for (let i = 0; i < myEncodingArr.length; i++) {
    let the_sum = myEncodingArr[i] + myEncodingPlainArr[i];
    encodedFormat.push(the_sum);
  }

  return encodedFormat;
};

//console.log(encrypting("codesignal", "keywordkeyword", 1, 2));

const snakeToCamel = (string) => {
  const toCamel = (s) => {
    return s.replace(/([a-z][_][a-z])/gi, (x) => {
      return x.replace(/([_][a-z])/gi, (v) => {
        return v.toUpperCase().replace("_", "");
      });
    });
  };
  a = toCamel(src);
  for (let i = 0; i < 3; i++) {
    a = toCamel(a);
  }
  return a;
};
//console.log(snakeToCamel("_doc_string__"));
//console.log(snakeToCamel("This is the doc_string for __secret_fun"));

const memoryBlock = (memory, queries) => {
  let arrOfIds = [];
  for (let i = 0; i < memory.length; i++) {
    arrOfIds[i] = 0;
  }
  let allocCounter = 1;
  const checkContiguous = (n, the_arr) => {
    let arr = [];
    for (let i = 0; i < the_arr.length - (n - 1); i++) {
      a = the_arr.slice(i, n + i);
      arr.push(a);
    }
    for (let i = 0; i < arr.length; i++) {
      elemInArr = arr[i];
      if (
        elemInArr.every((el, index) => {
          return el === 0;
        })
      ) {
        return elemInArr, i;
      }
    }
    return -1;
  };
  const alloc = (x) => {
    let whereToAlloc = checkContiguous(x, memory);
    if (whereToAlloc === -1) {
      return -1;
    }
    for (let i = whereToAlloc; i < x; i++) {
      memory[i] = 1;
      arrOfIds[i] = allocCounter;
    }
    allocCounter += 1;
    console.log(memory);
    console.log(arrOfIds);
    return whereToAlloc;
  };
  const erase = (id) => {
    let whereToErase = arrOfIds.includes(id) ? id : -1;
    if (whereToErase === -1) {
      return -1;
    }
    //using the logic of creating a representaional array of ids
    //that look like memory
    let whereToEraseId = arrOfIds.filter((el, index) => {
      return el === whereToErase && index;
    });

    for (let i = 0; i < whereToEraseId; i++) {
      arrOfIds[whereToErase[i]] = 0;
      memory[whereToEraseId[i]] = 0;
    }
    console.log(memory);
    console.log(arrOfIds);
    return whereToEraseId.length;
  };
  //Driver Code
  let finalArr = [];
  for (let i = 0; i < queries.length; i++) {
    let query = queries[i];
    if (query[0] === 0) {
      finalArr.push(alloc(query[1]));
    } else {
      finalArr.push(erase(query[1]));
    }
  }

  return finalArr;
};

const memory = [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0];
const queries = [
  [0, 2],
  [0, 1],
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 4],
];

//console.log(memoryBlock(memory, queries));

const memory1 = [0, 0, 0, 0];
const queries1 = [
  [0, 4],
  [0, 1],
  [1, 1],
  [0, 2],
  [0, 2],
];
//console.log(memoryBlock(memory, queries));
// let x = [14, 3, 77];
// let y = x.slice(1, 2);
// console.log(x);
// console.log(y);
