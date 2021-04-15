import { getLetterCount } from "./letter-count";
import deepEqual from "deepequal";

export const anagrams = (string1, string2) => {
  if (string1 === "" || string2 === "") {
    return false;
  }

  const string1LetterCount = getLetterCount(string1);
  const string2LetterCount = getLetterCount(string2);

  return deepEqual(string1LetterCount, string2LetterCount);
};
