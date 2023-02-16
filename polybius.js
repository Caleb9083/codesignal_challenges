function solution(plaintext, keyword, row, column) {
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
  let keywordArr = keyword.split("");
  let alphaWithoutKeyword = alpha.filter((el) => {
    return !keywordArr.includes(el);
  });

  let concatingArr = keywordArr.concat(alphaWithoutKeyword);
  let lastEl = concatingArr.pop();
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

  let plainEncod = [encodingArr, plaintextArr];
  // console.log(plainEncod);

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

  let encodedFormats = [myEncodingArr, myEncodingPlainArr];
  // console.log(encodedFormats);
  let encodedFormat = [];
  for (let i = 0; i < myEncodingArr.length; i++) {
    let the_sum = myEncodingArr[i] + myEncodingPlainArr[i];
    encodedFormat.push(the_sum);
  }

  return encodedFormat;
}

//TEST
const plaintext1 = "codesignal";
const keyword1 = "keyword";
const row1 = 1;
const column1 = 2;
console.log("Test 1");
console.log(solution(plaintext1, keyword1, row1, column1));
// Output
// [36, 27, 35, 26, 66, 55, 54, 54, 35, 54]

const plaintext2 = "nihilist";
const keyword2 = "cipher";
const row2 = 1;
const column2 = 1;
console.log("Test 2");
console.log(solution(plaintext2, keyword2, row2, column2));
// Output
// [52, 24, 27, 26, 49, 33, 55, 57]

const plaintext3 = "z";
const keyword3 = "ab";
const row3 = 1;
const column3 = 1;
console.log("Test 3");
console.log(solution(plaintext3, keyword3, row3, column3));
// Output
// [22, 23]
