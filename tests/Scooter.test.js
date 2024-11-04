const Scooter = require('../src/Scooter')
const User = require('../src/User')

const scooter = new Scooter('Denver');

//typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    expect(scooter).toBeInstanceOf(Scooter);
  });
})

//Method tests
describe('scooter methods', () => {
  // tests here!
  //rent method
  test('rent should assign a user', () => {
    let joeBloggs = new User("Joe Bloggs", "test123", 21)
    scooter.rent(joeBloggs)
    expect(scooter.user).toEqual(joeBloggs)
  })
  test('rent should throw an error', () => {
    let joeBloggs = new User("Joe Bloggs", "test123", 21)
    scooter.isBroken = true
    expect(() => scooter.rent(joeBloggs)).toThrow('scooter needs repair')
  })
  //dock method
  test('the station shoudl equal Denver', () => {
    scooter.dock('Denver')
    expect(scooter.station).toEqual('Denver')
  })
  test('the user shoudl equal null', () => {
    scooter.dock('Denver')
    expect(scooter.user).toEqual(null)
  })

  //requestRepair method
  

  //charge method

})
