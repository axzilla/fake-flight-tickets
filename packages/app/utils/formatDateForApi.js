function formatDateForApi(date) {
  const day = date.split('-')[2]
  const month = date.split('-')[1]
  const year = date.split('-')[0]
  return `${day}/${month}/${year}`
}

export default formatDateForApi
