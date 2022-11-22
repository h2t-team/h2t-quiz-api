import { Request, Response } from 'express';
import { 
  findGroupsByUser, 
  findGroupById, 
  createGroup, 
  addUsersToGroup, 
} from "../services/group.service";

const getGroupsByUser = async (req: Request, res: Response) => {
  try {
    // TODO: retrieve the user data from the token
    const userId = '94020a57-cae8-447f-b013-b7b02939d66d';

    const groups = await findGroupsByUser(userId);

    return res.status(200).json({
      success: true,
      data: {
        groups,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
}

const getGroupById = async (req: Request, res: Response) => {
  try {
    const groupId: string = req.params.groupId;

    const group = await findGroupById(groupId);
    
    return res.status(200).json({ 
      success: true, 
      data: {
        group,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
}

const createNewGroup = async (req: Request, res: Response) => {
  try {
    // TODO: retrieve the user data from the token
    const userId = '94020a57-cae8-447f-b013-b7b02939d66d';

    const { groupName, memberIdList } = req.body;
    if (!groupName || !memberIdList) {
      return res.status(400).json({
        success: false,
        message: 'Missing informations'
      });
    }

    const group = await createGroup(userId, groupName);
    
    const usersInGroup = await addUsersToGroup(group.id, memberIdList);

    return res.status(200).json({ 
      success: true, 
      message: 'Create a new group successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
} 

const addUsersToExistingGroup = async (req: Request, res: Response) => {
  try {
    // TODO: retrieve the user data from the token
    const userId = 'abc';

    const { groupdId, memberIdList } = req.body;
    if (!groupdId || !memberIdList) {
      return res.status(400).json({
        success: false,
        message: 'Missing informations'
      });
    }
    await addUsersToGroup(groupdId, memberIdList);
    return res.status(200).json({
      success: true,
      message: 'Add users successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
} 

export { 
  getGroupsByUser, 
  getGroupById,
  createNewGroup,
  addUsersToExistingGroup,
};