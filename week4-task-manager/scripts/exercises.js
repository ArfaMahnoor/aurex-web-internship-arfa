// Exercise 1: Variables (let, const)
const studentName = "Arfa";
let age = 21;
age = 22;
console.log("Exercise 1 - Variables:", studentName, age);

// Exercise 2: Conditions (if, else if, else)
const number = 5;
if (number > 0) {
  console.log("Exercise 2 - Conditions: positive");
} else if (number < 0) {
  console.log("Exercise 2 - Conditions: negative");
} else {
  console.log("Exercise 2 - Conditions: zero");
}

// Exercise 3: Loops (for, while)
for (let i = 1; i <= 5; i++) {
  console.log("Exercise 3 - for loop:", i);
}
let count = 1;
while (count <= 3) {
  console.log("Exercise 3 - while loop:", count);
  count++;
}

// Exercise 4: Functions (normal and arrow)
function add(a, b) {
  return a + b;
}
const multiply = (a, b) => a * b;
console.log("Exercise 4 - Functions:", add(2, 3), multiply(2, 3));

// Exercise 5: Arrays
const fruits = ["apple", "banana"];
fruits.push("mango");
fruits.pop();
console.log("Exercise 5 - Arrays:", fruits, fruits[0]);
const doubled = [1, 2, 3].map((n) => n * 2);
console.log("Exercise 5 - map:", doubled);

// Exercise 6: Objects
const task = { id: 1, text: "Study JS", completed: false };
task.completed = true;
console.log("Exercise 6 - Objects:", task.text, task.completed);

// Exercise 7: Template literals and destructuring
const { text, completed } = task;
console.log(`Exercise 7 - Task "${text}" completed: ${completed}`);
