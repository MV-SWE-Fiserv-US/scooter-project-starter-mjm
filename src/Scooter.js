class Scooter{
  // scooter code here
  #nextSerial
  constructor(station) {
    this.station = station
    this.user = null
    this.serial = 1
    this.#nextSerial = this.serial++
    this.charge = 100
    this.isBroken = false
  }
  rent(user) {
    if(this.charge > 20 && !this.isBroken) {
      this.user = user
      this.station = null
    } else {
      throw new Error('scooter needs repair')
    }
  }
  dock(station) {
    this.station = station
    this.user = null
  }

}


module.exports = Scooter
