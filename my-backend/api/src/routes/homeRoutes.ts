import {Router} from 'express';
import {getLastData} from '../../../db/db';

const router = Router();

router.get('/devices', (req, res) => {
  res.send(getLastData('zigbee2mqtt/bridge/devices'));
});

router.get('/devices/options', (req, res) => {
  res.send({
    '0x00158d0001a2b3c4': {
      friendly_name: 'living_room_light',
    }
  });
});

export default router;