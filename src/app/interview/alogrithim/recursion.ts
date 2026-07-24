export default function useRecursion() {
  // print numbers using recursion
  printNumbers(5);
  // sum of numbers
  console.log(`sum of all numbers ${sumNumbers(2)}`);
  // factorial of number
  console.log(`factorial number is ${factorialOfNumbers(3)}`);
}

function printNumbers(n: number) {
  // Base case
  if (n === 0) return;
  // Work
  // Recursive call
  console.log(n);
  printNumbers(n - 1);
}

function sumNumbers(number: number): number {
  // Base case
  if (number == 0) return 0;
  // Recursive call
  return number + sumNumbers(number - 1);
}

function factorialOfNumbers(number: number): number {
  console.log(`factorial number ${number}`);
  // base case
  if (number == 1) {
    return 1;
  }
  // Recursive call
  return number * factorialOfNumbers(number - 1);
}

function fibonacciSearies() {}
