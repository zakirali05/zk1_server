import { prismaDB } from "../server"

export const getAllVideos = async (req: any, res: any) => {
    try {
        const videos = await prismaDB.video.findMany()
        return res.json({ status: 200, message: "All Videos Found", data: videos })
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const getVideoById = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const uploadVideo = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const editVideo = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const deleteVideo = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const likeVideo = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const dislikeVideo = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}


export const commentOnVideo = async (req: any, res: any) => {
    try {

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}