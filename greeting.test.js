const { getVisitorGreeting } = require("../public/script.js");

// new Date(year, monthIndex, day, hour) — Oct 2026: 26 = Mon, 29 = Thu, 30 = Fri, 31 = Sat
describe("getVisitorGreeting", () => {
  test("says good morning before noon", () => {
    expect(getVisitorGreeting(new Date(2026, 9, 29, 9))).toMatch(/^Good morning!/);
  });

  test("says good afternoon between 12:00 and 17:59", () => {
    expect(getVisitorGreeting(new Date(2026, 9, 29, 14))).toMatch(/^Good afternoon!/);
  });

  test("says good evening from 18:00", () => {
    expect(getVisitorGreeting(new Date(2026, 9, 29, 20))).toMatch(/^Good evening!/);
  });

  test("counts days until the weekend on a Monday", () => {
    expect(getVisitorGreeting(new Date(2026, 9, 26, 9)))
      .toBe("Good morning! Happy Monday. 5 days until the weekend.");
  });

  test("uses singular 'day' on Friday", () => {
    expect(getVisitorGreeting(new Date(2026, 9, 30, 9)))
      .toBe("Good morning! Happy Friday. 1 day until the weekend.");
  });

  test("wishes a good weekend on Saturday", () => {
    expect(getVisitorGreeting(new Date(2026, 9, 31, 10)))
      .toBe("Good morning! Happy Saturday. Enjoy your weekend!");
  });
});
