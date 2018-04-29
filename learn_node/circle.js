const circumference = (r) => {
  return `The circumference of a circle of radius ${r} is ${2 * Math.PI * r}`
}

const area = (r) => {
  return `Its area is ${Math.PI * r * r}`
}

module.exports = {
  circumference,
  area
}