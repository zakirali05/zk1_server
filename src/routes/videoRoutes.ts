const { deleteVideo, dislikeVideo, editVideo, getAllVideos, getVideoById, likeVideo, uploadVideo } = require("../controllers/videoControllers")

const { isAuthenticated } = require("../middleware/isAuthenticated")

const express = require("express")

const router = express.Router()


router.get("/", getAllVideos)
router.get("/:id", getVideoById)
router.post("/", isAuthenticated, uploadVideo)
router.put("/:id", isAuthenticated, editVideo)
router.delete("/:id", isAuthenticated, deleteVideo)
router.put("/like/:id", isAuthenticated, likeVideo)
router.put("/dislike/:id", isAuthenticated, dislikeVideo)





module.exports = router

