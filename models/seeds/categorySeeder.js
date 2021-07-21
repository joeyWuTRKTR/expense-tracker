const categoryData = require('./seed.json') // require json
const categoryList = categoryData.categorySeeds // narrow down a object x array
const Category = require('../category')  // import schema from model

const db = require('../../config/mongoose') // include mongodb


// import data into mongodb
db.once('open', () => {
  categoryList.forEach(category => {
    Category.create({
      name: category.name,
      name_cn: category.name_cn,
      iconClass: category.iconClass,
    })
  })
  console.log('Category seeder finished!')
})