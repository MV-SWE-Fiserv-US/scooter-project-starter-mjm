const { describe, expect, it } = require("@jest/globals");
const Scooter = require("../src/Scooter.js");

describe("scooter.rent(user)", () => {
  const scooter = new Scooter('station1');

  it("checks a scooter out to a user", () => {
    scooter.charge = 30;
    scooter.isBroken = false;
    expect(scooter.rent('mel')).toEqual('mel');
  });

  it("throws an error if battery dead or scooter broken", () => {
    scooter.charge = 10;
    scooter.isBroken = false;
    expect(() => scooter.rent('mel')).toThrow('scooter needs to charge');
    
    scooter.charge = 30;
    scooter.isBroken = true;
    expect(() => scooter.rent('mel')).toThrow('scooter needs repair');
  });
});

describe("scooter.dock(station)", () => {
  it("returns a scooter to a station", () => {
    const scooter = new Scooter('station1');
    expect(scooter.dock('station2')).toBeUndefined(); // dock method returns nothing
    expect(scooter.station).toBe('station2');
    expect(scooter.user).toBeNull();
  });
});

