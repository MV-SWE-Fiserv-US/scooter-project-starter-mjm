const User = require('./User');
const Scooter = require('./Scooter');

class ScooterApp {
  constructor() {
    this.stations = {
      nyc: [],
      la: [],
      nj: []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (username in this.registeredUsers) {
      throw new Error('User is already registered');
    }
    if (age < 18) {
      throw new Error('Too young to register');
    }
    const newUser = new User(username, password);
    this.registeredUsers[username] = newUser;
    return newUser;
  }

  loginUser(username, password) {
    if (!(username in this.registeredUsers)) {
      throw new Error('Username is incorrect');
    }
    if (this.registeredUsers[username].password !== password) {
      throw new Error('Password is incorrect');
    }
    this.registeredUsers[username].login(password);
    console.log('User has been logged in');
    return `${username} has been logged in`
  }

  logoutUser(username) {
    if (!(username in this.registeredUsers) || this.registeredUsers[username].loggedIn === false) {
      throw new Error('No such user is logged in');
    }
    this.registeredUsers[username].logout();
    console.log('User is logged out');
    return 'User is logged out'
  }

  createScooter(station) {
    if (!(station in this.stations)) {
      throw new Error('No such station error');
    }
    const newScooter = new Scooter(station);
    this.stations[station].push(newScooter);
    return newScooter
  }

  dockScooter(scooter, station) {
    if (!(station in this.stations)) {
      throw new Error('No such station');
    }
    if (this.stations[station].includes(scooter)) {
      throw new Error('Scooter already at station');
    }
    scooter.dock(station);  
    this.stations[station].push(scooter);
    console.log('Scooter is docked');
  }

  rentScooter(scooter, user) {
    for (const station in this.stations) {
      const scooters = this.stations[station];
      const scooterIndex = scooters.indexOf(scooter);
      if (scooterIndex !== -1 && scooters[scooterIndex].user === null) {
        scooters[scooterIndex].rent(user);  
        return;
      }
    }
    throw new Error('Scooter already rented or not available');
  }

  print() {
    console.log(`List of registered users: ${Object.keys(this.registeredUsers)}`);
    console.log(`List of Stations: ${Object.keys(this.stations)}`);
    for (const station in this.stations) {
      const scooters = this.stations[station];
      console.log(`Number of scooters at ${station}: ${scooters.length}`);
    }
  }
}

module.exports = ScooterApp;

