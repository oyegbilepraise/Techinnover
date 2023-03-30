import express from 'express';
import { eventSchema } from '../validators/eventSchema';
import eventController from '../controllers/event';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/analytics', [
    validate(eventSchema),
    eventController.analytics
]);

router.get('/analytics', eventController.get_analytics);

export default router;
