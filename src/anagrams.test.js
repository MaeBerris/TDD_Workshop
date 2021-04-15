import { expect } from "chai";
import { anagrams } from "./anagrams";

describe("anagrams basis functionality", () => {
  it("returns false when one of the strings is empty", () => {
    const expected = false;
    const actual1 = anagrams("dog", "");
    const actual2 = anagrams("", "dog");
    expect(actual1).to.deep.equal(expected);
    expect(actual2).to.deep.equal(expected);
  });
  it("returns true when the two words are known anagrams", () => {
    const expected = true;
    const actual = anagrams("dog", "god");
    expect(actual).to.deep.equal(expected);
  });

  it("returns false when either of the string has extra letters", () => {
    const expected = false;
    const actual = anagrams("below", "elbows");
    expect(actual).to.deep.equal(expected);

    const actual2 = anagrams("elbows", "below");
    expect(actual2).to.deep.equal(expected);
  });

  it("returns false when the strings have the same letters, in different quantities", () => {
    const expected = false;
    const actual = anagrams("silence", "listens");
    expect(actual).to.deep.equal(expected);
  });
});
