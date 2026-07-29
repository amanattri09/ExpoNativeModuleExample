import { useEffect } from "react";

export function useGeneralAlogrithium() {
  useEffect(() => {
    main();
    bubleSort();
  }, []);
}

function main() {
  const nums = [44, 3, 4, 6, 1, 2];
  const sorted = nums.sort((a, b) => a - b);
  console.log(`sorted array ${sorted}`);
}

function bubleSort() {
  const arrayInt = [5, 3, 8, 4, 2];
  for (let i = 0; i < arrayInt.length - 1; i++) {
    for (let j = 0; j < arrayInt.length - i - 1; j++) {
      console.log(`value of j ${arrayInt[j]} and j+1 ${arrayInt[j + 1]}`);
      if (arrayInt[j] > arrayInt[j + 1]) {
        const temp = arrayInt[j];
        arrayInt[j] = arrayInt[j + 1];
        arrayInt[j + 1] = temp;
      }
    }
  }
  console.log(`array after sorting is ${arrayInt}`);
}
