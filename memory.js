// To solve this problem, we can use a map to store the allocated memory blocks. The key of the map is the ID and the value is a pair of integers representing the start and end positions of the memory block.
// We can use an atomic counter to keep track of the current ID. The counter starts at 1 and is incremented by 1 every time a new memory block is allocated.

// To handle the alloc query, we need to find the left-most contiguous subarray of 0s of length X. We can do this by iterating through the memory array and checking if the current subarray of length X has all 0s. If we find such a subarray, we allocate it by marking all its memory units as occupied (i.e., replacing 0s with 1s) and add the subarray to the map with a new ID from the atomic counter.

// To handle the erase query, we need to check if there is a memory block with the given ID in the map. If there is, we free the memory block by marking all its memory units as free (i.e., replacing 1s with 0s) and remove the memory block from the map.

// Finally, we return an array of all the query results.
function solution(memory, queries) {
  let atomicCounter = 1;
  let map = new Map();
  let result = [];
  for (let i = 0; i < queries.length; i++) {
    let [type, x] = queries[i];
    if (type === 0) {
      let start = memory.indexOf(0);
      if (start === -1) {
        result.push(-1);
        continue;
      }
      let end = start;
      while (end < memory.length && memory[end] === 0) {
        end++;
      }
      end--;
      if (end - start + 1 < x) {
        result.push(-1);
        continue;
      }
      let id = atomicCounter;
      map.set(id, [start, end]);
      atomicCounter++;
      for (let j = start; j <= end; j++) {
        memory[j] = 1;
      }
      result.push(start);
    } else {
      let id = x;
      if (!map.has(id)) {
        result.push(-1);
        continue;
      }
      let [start, end] = map.get(id);
      for (let j = start; j <= end; j++) {
        memory[j] = 0;
      }
      let length = end - start + 1;
      map.delete(id);
      result.push(length);
    }
  }
  return result;
}

const memory = [0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0];
const queries = [
  [0, 2],
  [0, 1],
  [0, 1],
  [1, 2],
  [1, 4],
  [0, 4],
];
console.log("Test 1");
console.log(solution(memory, queries));
// Output
// [2, 0, 4, 1, -1, -1]

const memory1 = [0, 0, 0, 0];
const queries1 = [
  [0, 4],
  [0, 1],
  [1, 1],
  [0, 2],
  [0, 2],
];
console.log("Test 2");
console.log(solution(memory1, queries1));
// Output

const memory3 = [1];
const queries3 = [
  [0, 1],
  [1, 1],
];
console.log("Test 3");
console.log(solution(memory3, queries3));
// Output
// [-1, -1]
