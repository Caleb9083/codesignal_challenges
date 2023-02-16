function solution(src) {
  const toCamel = (s) => {
    return s.replace(/([a-z]["_"][a-z])/gi, (x) => {
      return x.replace(/([_][a-z])/gi, (v) => {
        return v.toUpperCase().replace("_", "");
      });
    });
  };
  let a = toCamel(src);
  for (let i = 0; i < 3; i++) {
    a = toCamel(a);
  }
  return a;
}

//TEST
const src = "This is the doc_string for __secret_fun";
console.log("Test 1");
console.log(solution(src));
//Output
// "This is the doc_string for __secret_fun"

const src2 = "";
console.log("Test 2");
console.log(solution(src2));
//Output
// ""

const src3 = "_one_variable";
console.log("Test 3");
console.log(solution(src3));
//Output
// "_oneVariable"
