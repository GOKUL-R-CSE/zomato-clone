// Library
import express, { request } from 'express';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';


// Models
import { UserModel } from "../../database/user/index";

const Router = express.Router();

/*
    Route           /signup
    Desc            Register new user
    Params          None
    Access          Public
    Method          POST
*/

Router.post( "/signup", async (req,res) =>
{
    try
    {
        const { email, password, fullName, phoneNumber } = req.body.credentials;
        const checkUserByEmail = await UserModel.findOne( { email } );
        const checkUserByPhone = await UserModel.findOne( { phoneNumber } );

        // check whether email exists
        if ( checkUserByEmail || checkUserByPhone )
        {
            return res.json( { email: "User already exists !" } );
        }

        // hash password
        const bcryptSalt = await bcrypt.genSalt( 8 );
        const hashedPassword = await bcrypt.hash( password, bcryptSalt );

        // save to db
        await UserModel.create( { ...request.body.credentials, password: hashedPassword } );

        // genertaing JWT auth tokens
        const token = jwt.sign( { user: { fullName, email } }, "ZomatoApp" );

        return res.status( 200 ).json( { token, status: "success" } );

    } catch(error)
    {
        return res.status( 500 ).json( { error: error.messgae } );
    }
})