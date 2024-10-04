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
        let { id } = req.params
        id = parseInt(id)
        const videoExists = await prismaDB.video.findUnique({
            where: {
                id
            },
            include: {
                comments: true
            }
        })

        if (!videoExists) {
            return res.json({ status: 404, message: `Video with id:${id} doesn't exists` })
        }

        return res.json({ status: 200, message: "Video found", data: videoExists })
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
        let { id } = req?.params
        id = parseInt(id)

        const doesVideoExists = await prismaDB.video.findUnique({
            where: {
                id
            }
        })

        if (!doesVideoExists) {
            return res.json({ status: 404, message: `Video with id:${id} doesn't exist` })
        }


        const alreadyLiked = await prismaDB.video.findFirst({
            where: {
                id,
                likers: {
                    some: {
                        userId: req?.user?.user
                    }
                }
            }
        });

        if (!alreadyLiked) {
            const removeDisLike = await prismaDB?.disLike.deleteMany({
                where: {
                    userId: req?.user?.user,
                    videoId: id
                }
            })

            const decerementCount = await prismaDB?.video?.update({
                where: {
                    id
                },
                data: {
                    dislikes: {
                        decrement: 1
                    }
                }
            })
            const liked = await prismaDB.like.create({
                data: {
                    userId: req?.user?.user,
                    videoId: id
                }
            })

            const increaseCount = await prismaDB.video.update({
                where: {
                    id
                },
                data: {
                    likes: {
                        increment: 1
                    }
                }
            })

            if (increaseCount && liked && removeDisLike && decerementCount) {
                return res.json({ status: 200, message: `Video with id:${id} liked` })
            }
        }

        const removeLike = await prismaDB?.like.deleteMany({
            where: {
                userId: req?.user?.user,
                videoId: id
            }
        })

        const decerementCount = await prismaDB?.video?.update({
            where: {
                id
            },
            data: {
                likes: {
                    decrement: 1
                }
            }
        })


        if (decerementCount && removeLike) {
            return res?.json({ status: 200, message: `Remove like from video with id:${id}` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}

export const dislikeVideo = async (req: any, res: any) => {
    try {

        let { id } = req?.params
        id = parseInt(id)

        const doesVideoExists = await prismaDB.video.findUnique({
            where: {
                id
            }
        })

        if (!doesVideoExists) {
            return res.json({ status: 404, message: `Video with id:${id} doesn't exist` })
        }


        const alreadyDisLiked = await prismaDB.video.findFirst({
            where: {
                id,
                dislikers: {
                    some: {
                        userId: req?.user?.user
                    }
                }
            }
        });

        if (!alreadyDisLiked) {

            const removeLike = await prismaDB?.like.deleteMany({
                where: {
                    userId: req?.user?.user,
                    videoId: id
                }
            })

            const decerementCount = await prismaDB?.video?.update({
                where: {
                    id
                },
                data: {
                    likes: {
                        decrement: 1
                    }
                }
            })

            const dislikes = await prismaDB.disLike.create({
                data: {
                    userId: req?.user?.user,
                    videoId: id
                }
            })

            const increaseCount = await prismaDB.video.update({
                where: {
                    id
                },
                data: {
                    dislikes: {
                        increment: 1
                    }
                }
            })

            if (increaseCount && dislikes && decerementCount && removeLike) {
                return res.json({ status: 200, message: `Video with id:${id} disliked` })
            }
        }

        const removeDisLike = await prismaDB?.disLike.deleteMany({
            where: {
                userId: req?.user?.user,
                videoId: id
            }
        })

        const decerementCount = await prismaDB?.video?.update({
            where: {
                id
            },
            data: {
                dislikes: {
                    decrement: 1
                }
            }
        })


        if (decerementCount && removeDisLike) {
            return res?.json({ status: 200, message: `Remove dislike from video with id:${id}` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}
