const express = require('express');

const router = express.Router()

const { getUser, getAllUser, deleteUser, putUser, patchUser } = require('../controller/user-controller');



const verifyToken = require('../middleware/verifyToken')

const allowTo = require('../middleware/allowTo')

const userRole = require('../utils/user-roles')



router.get('/getUser/:id',getUser)

router.get('/getAllUsers',verifyToken, allowTo(userRole.MANAGER), getAllUser)

router.delete('/deleteUser/:id',verifyToken, allowTo(userRole.ADMIN,userRole.MANAGER),deleteUser)

router.put('/putUser/:id',verifyToken, allowTo(userRole.ADMIN,userRole.MANAGER),putUser)

router.patch('/patchUser/:id',verifyToken, allowTo(userRole.ADMIN,userRole.MANAGER),patchUser)

module.exports = router

// user/register

