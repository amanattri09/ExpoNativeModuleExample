import { useEffect } from "react";

export default function useStackAndQueue() {
  useEffect(() => {
    console.log(
      `is string is valid parenthesis ${isValidParenthesis("{}[]()")}`,
    );
  }, []);
}

function isValidParenthesis(strInput: string) {
  const charInput = strInput.split("");
  const stack: string[] = [];
  const map = new Map<string, string>();
  map.set(")", "(");
  map.set("]", "[");
  map.set("}", "{");

  for (let i = 0; i < charInput.length; i++) {
    if (charInput[i] == "{" || charInput[i] == "[" || charInput[i] == "(") {
      stack.push(charInput[i]);
    } else {
      if (map.get(charInput[i]) !== stack.pop()) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
