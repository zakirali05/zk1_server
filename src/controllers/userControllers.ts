
import { prismaDB } from "../server";
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        const email = req.body.email
        const password = req.body.password
        const saltRounds = 10;
        let hashedPassword = ""
        bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
            if (err) {

                return res.json({ status: 500, message: "Something went wrong in salt generation" })
            }

            bcrypt.hash(password, salt, (err: any, hash: any) => {
                if (err) {
                    return res.json({ status: 500, message: "Something went wrong in hashing the password" })
                }


                hashedPassword = hash
            });
        });


        const userExists = await prismaDB.user.findUnique({
            where: {
                email: email,

            }
        })

        if (userExists) {
            return res.json({ status: 403, message: "Email already registered" })
        }
        const user = await prismaDB.user.create({
            data: {
                email,
                hashedPassword
            }
        });
        const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, { expiresIn: "4d" });
        return res.json({ status: 200, message: "User created succesfully", data: user, token });

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
            return res.json({ status: 403, message: "User doesn't exist" })
        }
        if (userExists?.id !== req?.user?.user) {
            return res.json({ status: 401, message: "You can only delete your own account" })
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

export const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        let token = ""
        const isUserPresentInDB = await prismaDB.user.findUnique({
            where: {
                email
            }
        })


        if (!isUserPresentInDB) {
            return res.json({ status: 404, message: `User with email : ${email} not found` });
        }



        bcrypt.compare(password, isUserPresentInDB.hashedPassword, (err: any, result: any) => {
            if (err) {

                return res.json({ status: 500, message: err.message });
            }

            if (result) {
                token = jwt.sign({ user: isUserPresentInDB?.id }, process.env.JWT_SECRET, { expiresIn: "4d" });
                return res.json({ status: 200, message: "Login Sucessfully", user: isUserPresentInDB, token })
            } else {
                return res.json({ status: 401, message: "Invalid password" });
            }
        });

    } catch (err: any) {
        return res.json({ status: 500, message: err.message });

    }
}


export const resetPassword = async (req: any, res: any) => {
    try {
        const userId = req?.user?.user
        const oldPassword = req?.body?.oldpassword
        const newPassword = req?.body?.newpassword

        const user = await prismaDB.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.json({ status: 404, message: `User with id:${userId} not found` })
        }



        bcrypt.compare(oldPassword, user.hashedPassword, async (err: any, result: any) => {
            if (err) {

                return res.json({ status: 500, message: err.message, test: "1" });
            }

            if (result) {


                // now hash the new password
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
                    if (err) {

                        return res.json({ status: 500, message: "Something went wrong in salt generation" })
                    }

                    bcrypt.hash(newPassword, salt, async (err: any, hash: any) => {
                        if (err) {
                            return res.json({ status: 500, message: "Something went wrong in hashing the password" })
                        }
                        //   Update password in database
                        const updatedUser = await prismaDB.user.update({
                            where: {
                                id: userId
                            },
                            data: {
                                hashedPassword: hash
                            }
                        })

                        if (updatedUser) {
                            return res.json({ status: 200, message: "Password updated sucessfully", data: updatedUser })
                        }
                    });
                });




            } else {
                return res.json({ status: 401, message: "Invalid password" });
            }
        });





    } catch (err: any) {
        return res.json({ status: 500, message: err.message });

    }
}