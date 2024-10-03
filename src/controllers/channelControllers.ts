import { prismaDB } from "../server"

export const getAllChannels = async (req: any, res: any) => {
    try {
        const channels = await prismaDB.channel.findMany()
        return res.json({ status: 200, message: "All channels found", data: channels })
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}


export const getChannelById = async (req: any, res: any) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        const channel = await prismaDB.channel.findUnique({
            where: {
                id
            }
        })
        if (!channel) {
            return res.json({ status: 404, message: `Channel with id :${id} not found` })
        }
        return res.json({ status: 200, message: "Channel found", data: channel })
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}


export const createChannel = async (req: any, res: any) => {
    try {
        const body = req.body

        const channel = await prismaDB.channel.create({
            data: {
                ...body,
                userId: req.user.user
            }
        })

        if (channel) {
            return res.json({ status: 200, message: "Channel created sucessfully", data: channel })
        }
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}


export const deleteChannel = async (req: any, res: any) => {
    try {
        let { id } = req.params
        id = parseInt(id)


        const channel = await prismaDB.channel.findUnique({
            where: {
                id
            }
        })
        if (!channel) {
            return res.json({ status: 404, message: `Channel with id :${id} not found` })
        }

        if (channel?.userId !== req?.user?.user) {
            return res.json({ status: 401, message: "You can only delete your own channel" })
        }

        const deletedChannel = await prismaDB.channel.delete({
            where: {
                id
            }
        })


        return res.json({ status: 200, message: "Channel deleted sucessfully", data: deletedChannel })
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}


export const updateChannel = async (req: any, res: any) => {
    try {
        const body = req.body
        let { id } = req.params
        id = parseInt(id)


        const channel = await prismaDB.channel.findUnique({
            where: {
                id
            }
        })
        if (!channel) {
            return res.json({ status: 404, message: `Channel with id :${id} not found` })
        }

        if (channel?.userId !== req?.user?.user) {
            return res.json({ status: 401, message: "You can only update your own channel" })
        }

        const updatedChannel = await prismaDB.channel.update({
            where: {
                id
            },
            data: body
        })


        return res.json({ status: 200, message: "Channel updated sucessfully", data: updatedChannel })
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}