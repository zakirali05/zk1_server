const jwt = require("jsonwebtoken")
export const isAuthenticated = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token === null) {
            return res.json({ status: 401, message: "You are not authenticated" })
        }


        jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
            if (err) {
                return res.json({ status: 500, message: err.message })
            }
            req.user = user;
            // console.log(`This is req.user ${req.user}`)
            next();

        });

    } catch (err: any) {
        return res.json({ status: 500, message: err.message })
    }
}