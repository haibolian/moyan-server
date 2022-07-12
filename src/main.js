const { APP_PORT } = require('./config/config.default')

const app = require('./app')
require('./utils/Array')

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})
