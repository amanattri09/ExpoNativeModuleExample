import { useEffect } from "react";

export default function useInterview() {
  useEffect(() => {
    runAllCode();
  }, []);
}

function runAllCode() {
  // Sepread operator
  const numbers = [1, 2, 3];
  const newNumbers = [...numbers, 4, 5];
  console.log(`new numbers ${newNumbers}`);
  // Copy Array
  const array1 = [1, 2, 3];
  const array2 = [...array1];
  console.log(`array2 ${array2}`);
  // Array destructuring
  const person = {
    name: "aman",
    age: 5,
  };

  const updated = {
    ...person,
    city: "gurdaspur",
  };

  console.log(updated);

  const array3: number[] = [1, 2, 3];
  testFunction(1, 2, 3, 4);
  // Array Distructing
  const numbers3 = [1, 2, 3, 4, 5];
  const [first, ...remaining] = numbers;
  console.log(first);
  // Rest for array distructing
  const arr = [10, 34, 45, 53];
  const [ist, ...rest] = arr;
  // slice and splice
  const orignalArray = [1, 2, 34, 5];
  const slicedArray = orignalArray.slice(2, 3);
  console.log(`sliced array ${slicedArray}`);
  // sliced array
  const orignalArrayV2 = [3, 5, 6, 7];
  const splicedArray = orignalArrayV2.splice(2, 3, 9);
  console.log(`spliced array ${splicedArray} original arry ${orignalArrayV2}`);
  // palindoime string
  let strPalindome = "madam";
  isPalinDromeString(strPalindome);
  // remove duplicate
  const strDuplicate = "amanatmnp";
  removeDuplicate(strDuplicate);
  // analgram
  console.log(`are strings anagram ${anagram("listen", "silent")} `);
  // reverse string
  const str4 = "hello how are you";
  console.log(`reverese a word ${reverseWords(str4)}`);
  // frequeny oc char
  frequencyOfCharacter();
  // fabonacco searies
  fibonacciSeries(10);
  // Promise exampel
  promise2Example();
}

function testFunction(a: number, ...rest: number[]) {
  console.log(`a : ${a}`);
  console.log(`rest : ${rest}`);
}

function isPalinDromeString(str: string): boolean {
  let orignalString = str;
  let reversedString = orignalString.split("").reverse().join("");
  if (orignalString == reversedString) {
    return true;
  } else {
    return false;
  }
}

function removeDuplicate(strDuplicate: string) {
  const set = new Set(strDuplicate);
  const uniqueStr = Array.from(set).join("");
  console.log(`unique str ${uniqueStr}`);
}

function anagram(str1: string, str2: string): boolean {
  if (str1.length != str2.length) {
    return false;
  }
  return str1.split("").sort().join("") == str2.split("").sort().join("");
}

function reverseWords(str: string): string {
  return str.trim().split(/\s+/).reverse().join(" ");
}

function frequencyOfCharacter() {
  const map = new Map<string, number>();
  const str = "amanatri";
  for (const char of str) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  console.log(`frequency of character ${JSON.stringify(map)}`);
}

function fibonacciSeries(n: number) {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    let next = a + b;
    a = b;
    b = next;
  }
  console.log(`fibonacci series ${a} ${b}`);
}

function promiseExample() {
  return new Promise((resove, reject) => {
    setTimeout(() => {
      resove("success");
    }, 5000);
  });
}

async function promise2Example() {
  try {
    const result = await promiseExample();
    console.log(`promise result ${result}`);
  } catch (error) {
    console.log(`promise result ${error}`);
  }
}
