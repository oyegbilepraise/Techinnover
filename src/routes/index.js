import express from 'express';
import evnetRoute from "./event.Routes";

const router = express.Router();

router.use('/event', evnetRoute);

export default router;