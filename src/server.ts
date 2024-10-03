import { PrismaClient } from "@prisma/client";

const express = require("express");
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");


const app = express();
export const prismaDB = new PrismaClient()

app.use(cors());
app.use(express.json())
app.use("/api/v1/user", userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on post ${process.env.PORT}`);
});
