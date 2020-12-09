function getTime(timestamp) {
  return new Date(timestamp * 1000)
    .toLocaleTimeString()
    .replace(':00', '')
    .replace('AM', '')
    .replace('PM', '')
}

export default getTime
