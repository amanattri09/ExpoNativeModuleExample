export default function useInterview() {
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
