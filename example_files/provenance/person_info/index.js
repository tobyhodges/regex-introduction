#! /usr/bin/env node

const faker = require('faker')
const moment = require('moment')

faker.locale = 'de'
moment.locale('de')

n = 50
console.log('NAME,ADDRESS,EMAIL,DATE,PHONE,IP')

for (let i = 0; i < n; i += 1) {
  const name = faker.name.findName()
  const email = faker.internet.email()
  let date = moment(faker.date.past()).format('L')
  let phone = faker.phone.phoneNumber()
  let street = faker.address.streetName()
  const zipCode = faker.address.zipCode()
  const city = faker.address.city()
  const ip = faker.internet.ip()

  if (Math.random() < .2) {
    street = Math.random() < .5 ? 'First ' : '1st '
    street += Math.random() < .5 ? 'Street' : 'street' 
  }

  const address = `${Math.floor(Math.random() * 1000) + 1} ${street} ${zipCode} ${city}`

  if (i % 2 === 0) {
    phone = phone.replace(/-/g, '')
    date = date.replace(/(\d{2}(\d{2}))$/, (m, p1, p2) => p2)
  }

  const tokens = [
    name,
    address,
    email,
    date,
    phone,
    ip
  ]

  console.log(tokens.join(','))
}
