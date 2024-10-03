const { updateChannel } = require("../controllers/channelControllers")

const { deleteChannel } = require("../controllers/channelControllers")

const { createChannel } = require("../controllers/channelControllers")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const { getChannelById } = require("../controllers/channelControllers")

const { getAllChannels } = require("../controllers/channelControllers")

const express = require("express")

const router = express.Router()


router.get("/", getAllChannels)
router.get("/:id", getChannelById)
router.post("/", isAuthenticated, createChannel)
router.delete("/:id", isAuthenticated, deleteChannel)
router.put("/:id", isAuthenticated, updateChannel)

module.exports = router
