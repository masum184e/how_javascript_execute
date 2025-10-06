import { a } from "./declare.js";
import { exp } from "./export.js";

console.log(a)

// function greet() {
//   console.log("Hello from index.js");
// }

// greet();

var greet = () => {
  console.log("Hello from index.js");
}

greet();

console.log(exp)