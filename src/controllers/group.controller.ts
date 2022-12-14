import { Request, Response } from 'express';
import { findUser, findUserById } from '../services/user.service';
import {
  findGroupsByUser,
  findGroupById,
  createGroup,
  addUsersToGroup,
  setUserRoleInGroup,
  findUserInGroup,
  sendInvitationEmail,
  deleteGroup,
} from '../services/group.service';

const getGroupsByUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;

    const user = await findUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const groups = await findGroupsByUser(userId);

    return res.status(200).json({
      success: true,
      groups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getGroupById = async (req: Request, res: Response) => {
  try {
    const groupId: string = req.params.groupId;

    const group = await findGroupById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
      });
    }

    return res.status(200).json({
      success: true,
      group,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const createNewGroup = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;

    const user = await findUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { groupName, memberIdList } = req.body;

    if (!groupName || !memberIdList) {
      return res.status(400).json({
        success: false,
        message: 'Missing informations',
      });
    }

    const usersInGroup = await createGroup(userId, groupName);

    return res.status(201).json({
      success: true,
      message: 'Create a new group successfully',
      usersInGroup,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const addUsersToExistingGroup = async (req: Request, res: Response) => {
  try {
    // const { id: userId } = req.user;
    const { groupId } = req.params;
    const { memberIdList }: { groupId: string; memberIdList: string[] } =
      req.body;

    const group = await findGroupById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
      });
    }

    // const userInGroup = await findUserInGroup(groupId, userId);

    // if (userInGroup?.role !== 'owner' && userInGroup?.role !== 'co-owner') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'You do not have the permission to add users in the group',
    //   });
    // }

    if (!memberIdList) {
      return res.status(400).json({
        success: false,
        message: 'Please add one user',
      });
    }

    for (const memberId of memberIdList) {
      if (!(await findUserById(memberId))) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      if (await findUserInGroup(groupId, memberId)) {
        return res.status(400).json({
          success: false,
          message: 'A user has already in the group',
        });
      }
    }

    await addUsersToGroup(groupId, memberIdList);
    return res.status(201).json({
      success: true,
      message: 'Add users successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const setUserRole = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;

    const user = await findUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { groupId } = req.params;
    const { memberId, role } = req.body;

    if (!memberId || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing information',
      });
    }

    const group = await findGroupById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
      });
    }

    const userInGroup = await findUserInGroup(groupId, userId);

    if (userInGroup?.role !== 'owner') {
      return res.status(403).json({
        success: false,
        message:
          'You do not have the permission to set the user role in the group',
      });
    }

    await setUserRoleInGroup(groupId, memberId, role);

    return res.status(200).json({
      success: true,
      message: 'Set user role successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const setDeleteGroup = async (req: Request, res: Response) => {
  try {
    const { groupId, isDelete } = req.body;

    const group = await findGroupById(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found',
      });
    }

    if (!groupId || !isDelete) {
      return res.status(400).json({
        success: false,
        message: 'Missing information',
      });
    }

    await deleteGroup(groupId);

    return res.status(200).json({
      success: true,
      message: 'Delete group successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const inviteUserByEmail = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { email } = req.body;
  const group = await findGroupById(groupId);
  const user = await findUser({ email });
  const userInGroup = await findUserInGroup(groupId, user?.id);
  if (userInGroup) {
    return res.json({
      success: true,
      message: 'User is already in group',
    });
  }
  try {
    await sendInvitationEmail(email, group!);
    return res.json({
      success: true,
      message: 'Send invitation email successfully.',
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const checkUserInGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { id: userId } = req.user;
  try {
    const userInGroup = await findUserInGroup(groupId, userId);
    if (userInGroup) {
      return res.json({
        success: true,
        user: userInGroup,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User is not in group',
      });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  getGroupsByUser,
  getGroupById,
  createNewGroup,
  addUsersToExistingGroup,
  setUserRole,
  inviteUserByEmail,
  checkUserInGroup,
  setDeleteGroup,
};
