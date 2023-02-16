class Track {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
    this.pausedOn = 0;
  }

  play(time) {
    // TODO: implement this method
    this.pausedOn = (this.pausedOn + time) % this.duration;
  }

  reset() {
    // TODO: implement this method
    this.pausedOn = 0;
  }

  toString() {
    return `Track(name = ${this.name}, duration = ${this.duration}, pausedOn = ${this.pausedOn})`;
  }
}

class Playlist {
  constructor() {
    this.trackList = [];
  }

  addTrack(name, duration) {
    // TODO: implement this method
    const newTrack = new Track(name, duration);
    this.trackList.push(newTrack);
  }

  deleteTrack(name) {
    // TODO: implement this method
    this.trackList = this.trackList.filter((el) => {
      return el.name != name;
    });
    console.log(this.trackList);
  }

  playTrack(name, time) {
    // TODO: implement this method
    let track = this.trackList.filter((el) => {
      return el.name === name;
    });

    track[0].play(time);
  }

  resetTrack(name) {
    // TODO: implement this method
    if (name) {
      const track = this.trackList.filter((el) => {
        return el.name === name;
      });
      track[0].reset();
    } else {
      this.trackList.forEach((el) => {
        el.reset();
      });
    }
  }

  trackIndexByName(name) {
    // TODO: implement this method
    const trackIndex = this.trackList.findIndex((el) => {
      return el.name === name;
    });
    return trackIndex;
  }

  moveTrack(name, toIndex) {
    const index = this.trackIndexByName(name);
    if (index === toIndex) {
      return;
    }
    // TODO: complete the implementation of this method
    if (index === -1) {
      return;
    }
    const track = this.trackList.pop();
    this.trackList.splice(toIndex, 0, track);
  }

  toString() {
    return (
      "[" + this.trackList.map((track) => track.toString()).join(", ") + "]"
    );
  }
}

function solution(commands, names, parameters) {
  const playlist = new Playlist();
  const result = [];

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "add") {
      playlist.addTrack(names[i], parameters[i]);
    } else if (commands[i] === "delete") {
      playlist.deleteTrack(names[i]);
    } else if (commands[i] === "play") {
      playlist.playTrack(names[i], parameters[i]);
    } else if (commands[i] === "reset") {
      if (names[i] === "") {
        playlist.resetTrack();
      } else {
        playlist.resetTrack(names[i]);
      }
    } else if (commands[i] === "move") {
      playlist.moveTrack(names[i], parameters[i]);
    } else {
      // commands[i] === 'get'
      result.push(playlist.toString());
    }
  }

  return result;
}

// TEST
let commands = ["add", "play", "get", "add", "get"];
let names = ["Clair de Lune", "Clair de Lune", "", "Toxicity", ""];
let parameters = [303, 603, 0, 283, 0];
console.log("Test 1");
console.log(solution(commands, names, parameters));
//Output
// [
//   "[Track(name = Clair de Lune, duration = 303, pausedOn = 300)]",
//   "[Track(name = Clair de Lune, duration = 303, pausedOn = 300), Track(name = Toxicity, duration = 283, pausedOn = 0)]",
// ];

let commands2 = ["add", "get", "add", "get"];
let names2 = ["Loveless Love", "", '"Long Gone(From the Bowlin Green)"', ""];
let parameters2 = [1000, 0, 660, 0];
console.log("Test 2");
console.log(solution(commands2, names2, parameters2));
//Output
// [
//   "[Track(name = Loveless Love, duration = 1000, pausedOn = 0)]",
//   '[Track(name = Loveless Love, duration = 1000, pausedOn = 0), Track(name = "Long Gone(From the Bowlin Green)", duration = 660, pausedOn = 0)]',
// ];

let commands3 = ["add", "play", "get", "add", "get"];
let names3 = ["Clair de Lune", "Clair de Lune", "", "Toxicity", ""];
let parameters3 = [303, 603, 0, 283, 0];
console.log("Test 3");
console.log(solution(commands3, names3, parameters3));
//Output
// [
//   "[Track(name = Clair de Lune, duration = 303, pausedOn = 300)]",
//   "[Track(name = Clair de Lune, duration = 303, pausedOn = 300), Track(name = Toxicity, duration = 283, pausedOn = 0)]",
// ];

let commands4 = [
  "add",
  "play",
  "get",
  "add",
  "get",
  "add",
  "add",
  "get",
  "move",
  "get",
  "reset",
  "get",
  "delete",
  "get",
];
let names4 = [
  "Clair de Lune",
  "Clair de Lune",
  "",
  "Toxicity",
  "",
  "Caleb",
  "Osam",
  "",
  "Osam",
  "",
  "Clair de Lune",
  "",
  "Caleb",
  "",
];
let parameters4 = [303, 603, 0, 283, 0, 500, 600, 0, 1, 0];
console.log("Test 4");
console.log(solution(commands4, names4, parameters4));
