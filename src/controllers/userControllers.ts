
import { prismaDB } from "../server";

export const getAllUsers = async (req: any, res: any) => {
    try {
        const users = await prismaDB.user.findMany();

        return res.json({ status: 200, message: "All users", data: users });

    } catch (err: any) {
        return res.json({ status: 500, message: err.message });
    }
};


export const createUser = async (req: any, res: any) => {
    try {
        const body = req.body

        const userExists = await prismaDB.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (userExists) {
            return res.json({ status: 403, message: "Email already registered" })
        }
        const users = await prismaDB.user.create({
            data: body
        });

        return res.json({ status: 200, message: "User created succesfully", data: users });

    } catch (err: any) {
        return res.json({ status: 500, message: err.message });
    }
};

export const getUserById = async (req: any, res: any) => {
    try {
        let { id } = req.params
        id = parseInt(id)
        const user = await prismaDB.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return res.json({ status: 404, message: `User with id:${id} dons't exists` })
        }

        return res.json({ status: 200, message: "User found", data: user });

    } catch (err: any) {
        return res.json({ status: 500, message: err.message });
    }
};


export const deleteUser = async (req: any, res: any) => {
    try {
        let { id } = req.params
        id = parseInt(id)

        const userExists = await prismaDB.user.findUnique({
            where: {
                id
            }
        })

        if (!userExists) {
            return res.json({ status: 403, message: "EUser doesn't exist" })
        }
        const user = await prismaDB.user.delete({
            where: {
                id
            }
        });

        return res.json({ status: 200, message: "User deleted sucessfully", data: user });

    } catch (err: any) {
        return res.json({ status: 500, message: err.message });
    }
};