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

  let grid = {};

  // Create grid locations
  let gridLocations = [];
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 6; j++) {
      gridLocations.push(Number(`${i}${j}`));
    }
  }

  // create encoded characters for keyword
  for (let i = 0; i < keyword.length; i++) {
    grid[`${keyword[i]}`] = gridLocations[i];
  }

  // create striped alphabets
  let keywordArr = keyword.split("");
  let alphaWithoutKeyword = alpha.filter((el) => {
    return !keywordArr.includes(el);
  });

  // lonely
  let lastEl = alphaWithoutKeyword.pop();

  // create encoded for strip char
  for (
    let i = keywordArr.length;
    i < alphaWithoutKeyword.length + keywordArr.length;
    i++
  ) {
    grid[`${alphaWithoutKeyword[i - keywordArr.length]}`] = gridLocations[i];
  }

  // Assign lonely
  grid[`${lastEl}`] = Number(`${row}${column}`);

  if (plaintext.length < keyword.length) {
    for (let i = 0; i < keyword.length - plaintext.length; i++) {
      plaintext += keyword[i];
    }
  }

  //create encoded plaintext arr
  let encodedPlaintext = [];
  plaintext.split("").forEach((el) => {
    encodedPlaintext.push(grid[`${el}`]);
  });

  // create encoded keywork arr
  let encodedKeyword = [];
  keyword.split("").forEach((el) => {
    encodedKeyword.push(grid[`${el}`]);
  });

  for (let i = 0; i < plaintext.length; i++) {
    encodedKeyword.push(grid[`${keywordArr[i % keywordArr.length]}`]);
  }

  // sum resulting arrs

  let encodedFormat = [];
  for (let i = 0; i < encodedPlaintext.length; i++) {
    let the_sum = encodedPlaintext[i] + encodedKeyword[i];
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
