const { commentOnVideo, deleteVideo, dislikeVideo, editVideo, getAllVideos, getVideoById, likeVideo, uploadVideo } = require("../controllers/videoControllers")

const { isAuthenticated } = require("../middleware/isAuthenticated")

const express = require("express")

const router = express.Router()


router.get("/", getAllVideos)
router.get("/:id", getVideoById)
router.post("/", isAuthenticated, uploadVideo)
router.put("/:id", isAuthenticated, editVideo)
router.delete("/:id", isAuthenticated, deleteVideo)
router.put("/:id", isAuthenticated, likeVideo)
router.put("/:id", isAuthenticated, dislikeVideo)
router.put("/:id", isAuthenticated, commentOnVideo)





module.exports = router

