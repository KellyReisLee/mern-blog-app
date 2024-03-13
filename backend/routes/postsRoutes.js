const { Router } = require('express')

const router = Router();

router.get('/', (req, res) => {
  res.json('This is the post route.')
})

module.exports = router