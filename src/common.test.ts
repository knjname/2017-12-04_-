import { makeDouble, dFormat } from "src/common";

test("30 x 2 = 60", () => {
    expect(makeDouble(30)).toBe(60)
})

test("ISO Date", () => {
    expect(dFormat(new Date("2016-01-01"))).toBe("2016-01-01")
})