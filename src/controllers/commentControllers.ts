import { prismaDB } from "../server"


export const commentOnVideo = async (req: any, res: any) => {
    try {
        let { id } = req?.params
        id = parseInt(id)
        const { comment } = req.body

        const doesVideoExists = await prismaDB.video.findUnique({
            where: {
                id
            }
        })

        if (!doesVideoExists) {
            return res.json({ status: 404, message: `Video with id:${id} doesn't exist` })
        }

        const commented = await prismaDB.comment.create({
            data: {
                comment,
                userId: req?.user?.user,
                videoId: id
            }
        })

        if (commented) {
            return res.json({ status: 200, message: `You commented on "${comment}" video with id:${id}` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}



export const getAllCommentOfaVideo = async (req: any, res: any) => {
    try {
        let { id } = req.params
        id = parseInt(id)

        const videoWithComments = await prismaDB.video.findUnique({
            where: {
                id
            },
            include: {
                comments: true
            }
        })

        if (!videoWithComments) {
            return res.json({ status: 404, message: `Video with id:${id} doesn't exists` })
        }
        return res.json({ status: 200, message: "Coumments found", data: videoWithComments.comments })
    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}


export const updateComment = async (req: any, res: any) => {
    try {
        let { id } = req?.params
        id = parseInt(id)
        const { comment } = req?.body
        const commentExists = await prismaDB.comment.findUnique({
            where
                : {
                id
            }
        })

        if (!commentExists) {
            return res.json({ status: 404, message: `Comment with id:${id} not found` })
        }

        if (commentExists?.userId !== req?.user?.user) {
            return res.json({ status: 401, message: "You can only update your own comment" })
        }

        const updatedComment = await prismaDB?.comment.update({
            where: {
                id
            },
            data: {
                comment
            }
        })

        if (updatedComment) {
            return res?.json({ status: 200, message: `Comment with id:${id} updated` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}



export const deleteComment = async (req: any, res: any) => {
    try {
        let { id } = req?.params
        id = parseInt(id)
        const commentExists = await prismaDB.comment.findUnique({
            where
                : {
                id
            }
        })

        if (!commentExists) {
            return res.json({ status: 404, message: `Comment with id:${id} not found` })
        }

        if (commentExists?.userId !== req?.user?.user) {
            return res.json({ status: 401, message: "You can only delete your own comment" })
        }

        const updatedComment = await prismaDB?.comment.delete({
            where: {
                id
            },

        })

        if (updatedComment) {
            return res?.json({ status: 200, message: `Comment with id:${id} deleted` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}


export const likeComment = async (req: any, res: any) => {
    try {
        let { id } = req?.params
        id = parseInt(id)

        const isComment = await prismaDB.comment.findUnique({
            where: {
                id
            }
        })

        if (!isComment) {
            return res.json({ status: 404, message: `Comment with id : ${id} doesn't exists` })
        }

        const isLiked = await prismaDB.likeComment.findFirst({
            where: {
                userId: req?.user?.user,
                commentId: id
            }
        })

        if (isLiked) {
            const removedLike = await prismaDB.likeComment.delete({
                where: {
                    id: isLiked?.id
                }
            })
            if (removedLike) {
                return res.json({ status: 200, message: `Your like on comment id:${id} is removed` })
            }

        }

        const removeDisLike = await prismaDB.dislikeComment.deleteMany({
            where: {
                userId: req?.user?.user,
                commentId: id
            }
        })

        const liked = await prismaDB.likeComment.create({
            data: {
                userId: req?.user?.user,
                commentId: id
            }
        })
        if (liked && removeDisLike) {
            return res.json({ status: 200, message: `Comment with id : ${id} liked` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}


export const dislikeComment = async (req: any, res: any) => {
    try {

        let { id } = req?.params
        id = parseInt(id)

        const isComment = await prismaDB.comment.findUnique({
            where: {
                id
            }
        })

        if (!isComment) {
            return res.json({ status: 404, message: `Comment with id : ${id} doesn't exists` })
        }





        const isDisLiked = await prismaDB.dislikeComment.findFirst({
            where: {
                userId: req?.user?.user,
                commentId: id
            }
        })

        if (isDisLiked) {
            const removedDisLike = await prismaDB.dislikeComment.delete({
                where: {
                    id: isDisLiked?.id
                }
            })
            if (removedDisLike) {
                return res.json({ status: 200, message: `Your dislike on comment id:${id} is removed` })
            }

        }

        const removeLike = await prismaDB.likeComment.deleteMany({
            where: {
                userId: req?.user?.user,
                commentId: id
            }
        })

        const disliked = await prismaDB.dislikeComment.create({
            data: {
                userId: req?.user?.user,
                commentId: id
            }
        })
        if (disliked && removeLike) {
            return res.json({ status: 200, message: `Comment with id : ${id} disliked` })
        }

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })

    }
}