const toolsFunction = {
  // 將資料庫的日期格式轉為bootstrap value可以顯示的格式'yyyy-mm-dd'
  dateToString(date) {
    const day = ('0' + String(date.getDate())).slice(-2)
    const month = ('0' + String(date.getMonth() + 1)).slice(-2)
    const year = String(date.getFullYear())
    const dateArray = [year, month, day]
    return dateArray.join('-')
  },

  // getDate
  convertDate(date) {
    date = new Date(date)
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()

    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
    return (year + '-' + month + '-' + day)
  }
}

module.exports = toolsFunction