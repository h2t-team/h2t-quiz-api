import { Request, Response } from 'express';
import {
  findGroupsByUser,
  findGroupById,
  createGroup,
  addUsersToGroup,
  setUserRoleInGroup,
} from '../services/group.service';

const getGroupsByUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;

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

    const { groupName, memberIdList } = req.body;
    if (!groupName || !memberIdList) {
      return res.status(400).json({
        success: false,
        message: 'Missing informations',
      });
    }

    const usersInGroup = await createGroup(userId, groupName);

    return res.status(200).json({
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
    const { groupdId, memberIdList } = req.body;
    if (!groupdId || !memberIdList) {
      return res.status(400).json({
        success: false,
        message: 'Missing informations',
      });
    }
    await addUsersToGroup(groupdId, memberIdList);
    return res.status(200).json({
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

    const { groupdId, role } = req.body;
    if (!groupdId || !role) {
      return res.status(400).json({
        success: false,
        message: 'Missing informations',
      });
    }
    await setUserRoleInGroup(groupdId, userId, role);
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

export {
  getGroupsByUser,
  getGroupById,
  createNewGroup,
  addUsersToExistingGroup,
  setUserRole,
};
