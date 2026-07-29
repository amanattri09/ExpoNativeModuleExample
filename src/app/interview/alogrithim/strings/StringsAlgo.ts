import { useEffect } from "react";

export default function useStringsAlgo() {
  useEffect(() => {}, [main()]);
}

function main() {
  isStringPalinDrome();
  countFrequency();
  reverseString();
}

function isStringPalinDrome() {
  const str = "madam";
  const reveresedStr = str.split("").reverse().join("");
  console.log(`is str is palindrome ${str === reveresedStr}`);
}

function countFrequency() {
  let str = "aman attri";
  str = str.replace(" ", "");
  const map = new Map<string, number>();
  for (let char of str) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }
  // lets loop over map
  for (const [key, value] of map) {
    console.log(`${key} has frequency : ${value}`);
  }
}

function reverseString() {
  const str = "abcdef";
  let strArray = str.split("");
  let start = 0;
  let end = str.length - 1;
  while (start < end) {
    const temp = strArray[start];
    strArray[start] = strArray[end];
    strArray[end] = temp;
    start++;
    end--;
  }
  console.log(`reversed string is ${strArray.join("")}`);
}
