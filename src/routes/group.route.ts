import { Router } from 'express';
import {
  getGroupById,
  getGroupsByUser,
  createNewGroup,
  addUsersToExistingGroup,
  setUserRole,
} from '../controllers/group.controller';

const router = Router();

router.get('/', getGroupsByUser);

router.post('/createGroup', createNewGroup);

router.get('/:groupId', getGroupById);

router.post('/:groupId/addUsers', addUsersToExistingGroup);

router.put('/:groupId/setUserRole', setUserRole);

export default router;
