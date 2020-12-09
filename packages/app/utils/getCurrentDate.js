function getCurrentDate() {
  var curr = new Date()
  curr.setDate(curr.getDate())
  var date = curr.toISOString().substr(0, 10)
  return date
}

export default getCurrentDate
