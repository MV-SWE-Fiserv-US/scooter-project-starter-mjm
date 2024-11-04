const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

const scooterApp = new ScooterApp();
// ScooterApp tests here
let register1 = scooterApp.registerUser("John Cena", "abc123", 39)
// register user
describe("registerUser method tests", () => {
  test("Should return instance of User", () => {
    let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
    expect(response).toBeInstanceOf(User);
  });
  test('should throw an error', () => {
    expect(() => scooterApp.registerUser("Joe Bloggs", "test123", 21)).toThrow('User is already registered')
  })
  test('should throw an error', () => {
    expect(() => scooterApp.registerUser("Joebus Blogbert", "tester123", 16)).toThrow('Too young to register')
  })
});

// log in

//test for user not in registered users, should throw error
describe('invalid user login test', () =>{
  test('should throw username is incorrect error', () =>{
    expect(()=>scooterApp.loginUser('james', 'abc123')).toThrow('Username is incorrect')
  })
})

describe('invalid user password login test', () =>{
  test('should throw password is incorrect error', () =>{
    expect(()=>scooterApp.loginUser('John Cena', 'abc456')).toThrow('Password is incorrect')
  })
})

describe('Succesful Login test', () =>{
  test('should log in user', () =>{
    expect(scooterApp.loginUser('John Cena', 'abc123')).toBe('John Cena has been logged in')
  })
})

// log out

describe('log out of invalid user test', () =>{
    test('Should throw no such user error', () => {
      expect(()=>scooterApp.logoutUser('Jayson')).toThrow('No such user is logged in')
    })
})

describe('log out of invalid user test', () =>{
  let register2 = scooterApp.registerUser("Jon Jones", "abc123", 35)
  scooterApp.loginUser("Jon Jones", "abc123")
  test('Should log out user Jon Jones ', () => {
    expect(scooterApp.logoutUser('Jon Jones')).toBe('User is logged out')
  })
})

// rent scooter
describe('rentScooter tests', () => {
  let scooterApp;
  let scooter;
  let user;

  beforeEach(() => {
    scooterApp = new ScooterApp();
    scooter = new Scooter('nyc');
    user = new User('testUser', 'password123');

    
    scooterApp.stations['nyc'].push(scooter);
  });

  describe('rent available scooter', () => {
    test('Should rent the scooter successfully', () => {
      scooter.user = null;
      scooterApp.rentScooter(scooter, user);
      expect(scooter.user).toBe(user);
    });
  });

  describe('rent already rented scooter', () => {
    test('Should throw scooter already rented error', ()=>{
      scooter.user = user
      expect(() => {scooterApp.rentScooter(scooter, new User('anotherUser', 'password456'))}).toThrow('Scooter already rented or not available')})
  });

  describe('rent scooter not at station', () => {
    test('Should throw scooter not available error', () => {
      scooterApp.stations['nyc'] = []
      expect(() => {scooterApp.rentScooter(scooter, user)}).toThrow('Scooter already rented or not available')});
  })
});

// dock scooter

describe('dock scooter tests', () => {
  let scooter13
  let cobra
 
  cobra = scooterApp.registerUser('Cobra', 'celtics123', 27); 
  scooter13=scooterApp.createScooter('nyc'); 
  

describe('invalid station docking', ()=>{
  test('should throw No such station error', ()=>{
    expect(()=>scooterApp.dockScooter(scooter13,'jfk')).toThrow('No such station')
  })
  test('should throw No such station error', ()=>{
    expect(()=>scooterApp.createScooter(scooter13,'jfk')).toThrow('No such station')
  })
})

describe('Scooter already at station error', ()=>{
  test('should dock scooter to nyc', ()=>{
    expect(() => scooterApp.dockScooter(scooter13,'nyc')).toThrow('Scooter already at station')
  })
})

describe('Valid Scooter Docking Test', ()=>{
  test('should dock scooter to nj', ()=>{
    scooterApp.dockScooter(scooter13,'nj')
    expect(scooter13.station).toBe('nj')
  })
})

})

scooterApp.print()