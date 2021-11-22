import getUserByEmail from "../db/users/getUserByEmail.js"
import getUserByRefreshToken from "../db/users/getUserByRefreshToken.js"
import { maxAge, createAccessToken, refreshMaxAge, createRefreshToken } from "./createToken.js";
import { compareWithHash } from "./hash.js";
import jwt from "jsonwebtoken";
import "dotenv/config"

const signIn = async (email, password, res) => {
    const user = await getUserByEmail(email)

    if (typeof user == 'undefined') {
        res.status(400).send("no exist")
        return 0;
    }

    const isPasswordCorrect = await compareWithHash(password, user.password)

    if (isPasswordCorrect) {
        const accessToken = createAccessToken({ id: user.id, classId: user.class_id, role: user.role });
        const refreshToken = await createRefreshToken(user.id)

        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: refreshMaxAge * 1000 });
        res.status(201).json({
            userId: user.id,
            classId: user.classId,
            name: user.name,
            surname: user.surname
        });
    } else {
        res.status(400).send("invalid password")
    }
}

const signInWithRefreshToken = async (refreshToken, res) => {

    // check refresh token exists & is verified
    if (refreshToken) {
        jwt.verify(refreshToken, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                res.status(401).send();
            } else {
                const user = await getUserByRefreshToken(decodedToken.token)

                console.log("")
                console.log("")
                console.log("")
                console.log("User data")
                console.log(user)

                const accessToken = createAccessToken({ id: user.id, classId: user.class_id, role: user.role });

                res.cookie('jwt', accessToken, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({
                    userId: user.id,
                    classId: user.class_id,
                    name: user.name,
                    surname: user.surname
                });
            }
        });
    } else {
        res.status(401).send();
    }

}

export {signInWithRefreshToken}
export default signIn;