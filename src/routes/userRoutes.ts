const { isAuthenticated } = require("../middleware/isAuthenticated")

const { loginUser } = require("../controllers/userControllers")

const { deleteUser } = require("../controllers/userControllers")

const { getUserById } = require("../controllers/userControllers")

const { createUser } = require("../controllers/userControllers")

const { getAllUsers } = require("../controllers/userControllers")

const express = require("express")

const router = express.Router()

router.get("/", getAllUsers)
router.post("/login", loginUser)
router.get('/:id', getUserById)
router.post("/", createUser)
router.delete("/:id", isAuthenticated, deleteUser)




module.exports = router







