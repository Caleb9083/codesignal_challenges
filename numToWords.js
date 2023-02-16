function solution(num) {
  let string = num.toString(),
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
  scales = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];

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
}

//TEST
console.log(numbersToWords("123"));

// function numberToWords(num) {
//   if (num === 0) return 'Zero';

//   const lessThan20 = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//   let result = '';

//   if (num >= 1000000000) {
//     result += numberToWords(Math.floor(num / 1000000000)) + ' Billion ';
//     num %= 1000000000;
//   }

//   if (num >= 1000000) {
//     result += numberToWords(Math.floor(num / 1000000)) + ' Million ';
//     num %= 1000000;
//   }

//   if (num >= 1000) {
//     result += numberToWords(Math.floor(num / 1000)) + ' Thousand ';
//     num %= 1000;
//   }

//   if (num >= 100) {
//     result += numberToWords(Math.floor(num / 100)) + ' Hundred ';
//     num %= 100;
//   }

//   if (num >= 20) {
//     result += tens[Math.floor(num / 10) - 2] + ' ';
//     num %= 10;
//   }

//   if (num >= 1) {
//     result += lessThan20[num - 1] + ' ';
//   }

//   return result.trim();
// }
