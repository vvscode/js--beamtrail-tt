import { Router } from 'express';
import phones from './phones';
import phone from './phone';

const router = Router();

router.get('/api/phones', phones);

router.use('/api/phone', phone);

export default router;
