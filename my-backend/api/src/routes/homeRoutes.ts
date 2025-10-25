import {Router} from 'express';
import {getLastData} from '../../../db/db';

const router = Router();

router.get('/devices', (req, res) => {
  res.send(getLastData('zigbee2mqtt/bridge/devices'));
})

export default router;