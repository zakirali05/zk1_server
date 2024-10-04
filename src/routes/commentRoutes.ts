const { dislikeComment, likeComment } = require("../controllers/commentControllers")

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
router.put("/like/:id", isAuthenticated, likeComment)
router.put("/dislike/:id", isAuthenticated, dislikeComment)





module.exports = router

