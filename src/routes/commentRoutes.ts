const { deleteComment } = require("../controllers/commentControllers")

const { updateComment } = require("../controllers/commentControllers")

const { getAllCommentOfaVideo } = require("../controllers/commentControllers")

const { commentOnVideo } = require("../controllers/commentControllers")

const { isAuthenticated } = require("../middleware/isAuthenticated")

const express = require("express")

const router = express.Router()


router.get("/:id", getAllCommentOfaVideo)
router.post("/:id", isAuthenticated, commentOnVideo)
router.put("/:id", isAuthenticated, updateComment)
router.delete("/:id", isAuthenticated, deleteComment)





module.exports = router

