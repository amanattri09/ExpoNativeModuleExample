import { useEffect } from "react";

export default function useArraysAlgo() {
  useEffect(() => {
    main();
  }, []);
}

function main() {
  transverseArray();
  findMaxElement();
  sumOfAllElements();
  findSecondLargestElement();
  sortAnArray();
  removeDuplicates();
}

function transverseArray() {
  const array = [2, 3, 4, 54, 5];
  for (let number in array) {
    console.log(`number is ${number}`);
  }
}

function findMaxElement() {
  const array = [1, 2, 42, 5, 5, 3, 6];
  let maxElement = array[0];
  array.forEach((element) => {
    if (element > maxElement) {
      maxElement = element;
    }
  });
  console.log(`max element is ${maxElement}`);
}

function sumOfAllElements() {
  const array = [2, 3, 4, 5, 6];
  let sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  console.log(`sum is ${sum}`);
}

function findSecondLargestElement() {
  const array = [2, 3, 4, 5, 6];
  let largest = -Infinity;
  let secondLargest = -Infinity;
  array.forEach((element, index) => {
    if (element > largest) {
      secondLargest = largest;
      largest = element;
    } else if (element > secondLargest && secondLargest != largest) {
      secondLargest = element;
    }
  });
  console.log(`largest : ${largest} second largest : ${secondLargest}`);
}

function sortAnArray() {
  const array = [2, 4, 6, 3, 45, 6, 7];
  array.sort((a, b) => {
    return a - b;
  });
  console.log(`soted array ${JSON.stringify(array)}`);
  // sort an string array
  const arrayString = ["kabir", "aman", "attri", "aaaaa"];
  const sortedArray = arrayString.sort();
  console.log(`sorted string array ${sortedArray}`);
  // sorting in decending order
  const sortedArrayInDecending = arrayString.sort((a, b) => {
    return b.localeCompare(a);
  });
  console.log(`sortedArrayInDecending ${sortedArrayInDecending}`);
}

function removeDuplicates() {
  const array = [2, 3, 4, 5, 5, 5, 6];
}
