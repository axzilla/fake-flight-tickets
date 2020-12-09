function getDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString()
}

export default getDate
