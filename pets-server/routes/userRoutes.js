const express = require('express')
const UsersController = require('../controllers/usersController')
const { signupSchema, loginSchema } = require('../schemas/schemas');
const { validateBody } = require('../middleware/validateBody');
const { passwordsMatch, isNewUser, hashPwd, isExistingUser, auth } = require('../middleware/authMiddleware')
const router = express.Router()

/*  /users    */

router.post('/signup', validateBody(signupSchema), passwordsMatch, isNewUser, hashPwd, UsersController.signup);


router.post('/login', validateBody(loginSchema), isExistingUser, UsersController.login);


router.get('/logout', (req, res) => {
  try {

    const { token } = req.cookies;

    if (token) {
      res.clearCookie('token')
    }

    res.send({ ok: true })



  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})


router.get('/check-status', auth, UsersController.checkStatus)

router.get('/:id', auth,  UsersController.getUserbyID);

router.put('/:id', validateBody(signupSchema), passwordsMatch, hashPwd,  UsersController.editUser);


module.exports = router