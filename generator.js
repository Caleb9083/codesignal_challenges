// class Generator {
//   constructor() {
//     this.createdUsernames = new Map()
//     this.deletedUsernames = new Map()
//   }

//   create(name) {
//     if (!this.createdUsernames.has(name)) {
//       this.createdUsernames.set(name, 1);
//     } else {
//       this.createdUsernames.set(name, this.createdUsernames.get(name) + 1);
//     }
//     const username = `${name}${this.createdUsernames.get(name)}`;
//     if (this.deletedUsernames.has(username)) {
//       this.deletedUsernames.delete(username);
//     }
//     return username;
//   }

//   delete(username) {
//     this.deletedUsernames.set(username, true);
//   }
// }

// class Generator {
//   constructor() {
//     this.pool = new Map()
//   }

//   create(name) {
//     if (!this.pool.has(name)) {
//       this.pool.set(name, 1);
//     }
//     const nextIndex = this.pool.get(name);
//     this.pool.set(name, nextIndex + 1);
//     return `${name}${nextIndex}`;
//   }

//   delete(username) {
//     const [name, index] = [username.slice(0, -1), username.slice(-1)];
//     if (this.pool.has(name)) {
//       this.pool.set(name, Math.min(index, this.pool.get(name)));
//     }
//   }
// }

class Generator {
  constructor() {
    this.pool = {};
  }
  create(name) {
    if (
      !Object.keys(this.pool).includes(name) ||
      this.pool[`${name}`].length === 0
    ) {
      this.pool[`${name}`] = [1];
      console.log(this.pool);
      return `${name}${1}`;
    }

    this.pool[`${name}`] = this.pool[`${name}`].sort((a, b) => a - b);

    for (let i = 0; i < Math.max(this.pool[`${name}`]); i++) {
      if (i + 1 != this.pool[`${name}`][i]) {
        let theName = `${name}${i + 1}`;
        this.pool[`${name}`].push(i + 1);
        console.log(this.pool);

        return theName;
      }
    }
    let newMax = Math.max(...this.pool[`${name}`]) + 1;
    this.pool[`${name}`].push(newMax);
    console.log(this.pool);

    return `${name}${newMax}`;
  }

  delete(username) {
    const [name, index] = [username.slice(0, -1), username.slice(-1)];

    if (Object.keys(this.pool).includes(name)) {
      this.pool[`${name}`] = this.pool[`${name}`].filter((el) => {
        return el != index;
      });
    }
  }
}
function solution(queries) {
  const generator = new Generator();
  const results = [];
  queries.forEach((query) => {
    const [action, name] = query.split(" ");
    if (action === "create") {
      results.push(generator.create(name));
    } else if (action === "delete") {
      generator.delete(name);
    }
  });
  return results;
}

// TEST
const queries = [
  "create alex",
  "create alex",
  "delete alex1",
  "create alex",
  "create john",
];
// Output
// ["alex1",
//  "alex2",
//  "alex1",
//  "john1"]

// console.log("Test 1");
// console.log(solution(queries));

const queries2 = [
  "create alex",
  "create alex",
  "delete alex1",
  "create alex",
  "create john",
  "create john",
  "create ama",
  "delete john1",
  "create john",
  "create john",
];
// Output
// ["alex1", "alex2", "alex1", "john1", "john2", "ama1", "john1", "john3"]
// console.log("Test 2");
// console.log(solution(queries2));

const queries3 = [
  "create a",
  "create a",
  "create ab",
  "create abc",
  "delete abc1",
  "create abcd",
  "delete abcd1",
  "delete a1",
  "delete ab1",
  "create abc",
];
// console.log("Test 3");
// console.log(solution(queries3));
// a = 4;
// console.log([].filter((el) => el != 4));
