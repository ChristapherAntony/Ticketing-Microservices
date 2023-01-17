import { currentUser } from './../middlewares/current-user';
import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser',currentUser, (req, res) => {  //check current user
    res.send({ currentUser: req.currentUser || null });  //current user is send || send null
});

export { router as currentUserRouter };
