import { Router } from 'express';
import {
  getGroupById,
  getGroupsByUser,
  createNewGroup,
  addUsersToExistingGroup,
  setUserRole,
  inviteUserByEmail,
  checkUserInGroup,
  setDeleteGroup,
} from '../controllers/group.controller';

const router = Router();

router.get('/', getGroupsByUser);

router.post('/createGroup', createNewGroup);

router.get('/:groupId', getGroupById);

router.get('/:groupId/check-user', checkUserInGroup);

router.post('/:groupId/addUsers', addUsersToExistingGroup);

router.post('/:groupId/inviteUserByEmail', inviteUserByEmail);

router.put('/:groupId/setUserRole', setUserRole);

router.put('/setDeleteGroup', setDeleteGroup);

export default router;
