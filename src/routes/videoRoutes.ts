const { deleteVideo, dislikeVideo, editVideo, getAllVideos, getVideoById, likeVideo, uploadVideo } = require("../controllers/videoControllers")

const { isAuthenticated } = require("../middleware/isAuthenticated")

const express = require("express")

const router = express.Router()


router.get("/", getAllVideos)
router.get("/:id", getVideoById)
router.post("/:channelId", isAuthenticated, uploadVideo)
router.put("/:channelId/:id", isAuthenticated, editVideo)
router.delete("/:channelId/:id", isAuthenticated, deleteVideo)
router.put("/like/:id", isAuthenticated, likeVideo)
router.put("/dislike/:id", isAuthenticated, dislikeVideo)
// TODO : SEARCH VIDEO ROUTE WITH VECTOR SEARCH




module.exports = router

