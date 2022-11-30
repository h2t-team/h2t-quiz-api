import { Request, Response } from 'express';
import { findUserById, updateUser } from '../services/user.service';

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not exist',
      });
    }
    delete user['password'];
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { fullname, phone } = req.body;
    await updateUser(id, fullname, phone);
    return res.status(200).json({
      success: true,
      message: 'Update successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server is not available.',
    });
  }
};

export { getUserInfo, updateUserInfo };
