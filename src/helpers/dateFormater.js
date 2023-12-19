const dateFormater = (date) => {
  const date1 = new Date(date)
  let fullDate
  if (date1.toLocaleDateString().includes('/')) {
    let x = date1.toLocaleDateString().split('/')
    let fullDateArray = [x[1], x[0], x[2]]
    fullDate = fullDateArray.map((e) => (e.length == 1 ? '0' + e : e)).join('.')
  } else {
    fullDate = date1
      .toLocaleDateString()
      .split('.')
      .map((e) => (e.length == 1 ? '0' + e : e))
      .join('.')
  }
  const timesArray = date1.toLocaleTimeString().split(':')
  if (date1.toLocaleTimeString().includes('PM') || date1.toLocaleTimeString().includes('AM')) {
    const hasPM = date1.toLocaleTimeString().includes('PM')
    if (hasPM && +timesArray[0] != 12) {
      timesArray[0] = +timesArray[0] + 12
    } else if (hasPM && +timesArray[0] == 12) {
      timesArray[0] = timesArray[0] - 12
    }
  }
  const fullTime =
    (timesArray[0]?.toString().length == 1 ? '0' + timesArray[0] : timesArray[0]) +
    ':' +
    (timesArray[1]?.toString().length == 1 ? '0' + timesArray[1] : timesArray[1])
  return `${fullDate} ${fullTime}`
}

export default dateFormater
