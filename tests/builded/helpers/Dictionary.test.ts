import { Dictionary } from "../../../dist/helpers/Dictionary.js";

describe("Dictionary (Built)", () => {
    it("should export Dictionary properly", () => {
        const dict = new Dictionary<string, number>();
        dict.set("one", 1);
        expect(dict.get("one")).toBe(1);
    });

    it("should instantiate from record (Built)", () => {
        const dict = new Dictionary<string, number>({ a: 10, b: 20 });
        expect(dict.get("a")).toBe(10);
        expect(dict.length).toBe(2);
    });
    
    it("should iterate using forEach (Built)", () => {
         const dict = new Dictionary<string, number>([["a", 1]]);
         let count = 0;
         dict.forEach((val, key) => {
             expect(val).toBe(1);
             expect(key).toBe("a");
             count++;
         });
         expect(count).toBe(1);
    });
});
