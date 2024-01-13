import { Server } from "../../services/server/server.js";
import GroupModel from '../../models/Group.Model.js'
import UserModel from "../../models/User.Model.js";
import ChoreModel from "../../models/Chore.Model.js";
import GroceryModel from "../../models/Grocery.Model.js";

export async function addGroupController(req, res) {
  const groupInfo = req.body;
  const userId = req.user._id.toString();

  if(groupInfo.owner !== userId) {
    return res.status(403).send({ message: "Invalid User" });
  }

  try {
    const group = await GroupModel.create({ ...groupInfo });

    // Add group ID to the user's groups array
    await UserModel.findByIdAndUpdate(userId, { $push: { groups: group._id } });

    const groupObj = group.toObject();
    groupObj.id = groupObj._id;
    delete groupObj._id;

    return res.status(200).json(groupObj);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}


export async function getAllGroupsController(req, res) {
  try {
    const userId = req.user._id;
    const groups = await GroupModel.find({
      $or: [{ owner: userId }, { 'members.userId': userId }]
    })
    .sort({ createdAt: -1 });

    return res.status(200).json(groups);
  } catch (error) {
    return res.status(400).send({ message: "Invalid request" });
  }
}

export async function addUserToGroupController(req, res) {
  try {
    const { memberId } = req.body;
    const { groupId } = req.params;

    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }
    
    const existingMember = group.members.find(member => member.userId.toString() === memberId);
    if (existingMember) {
      return res.status(400).json({ message: "User already in group!" });
    }

    const user = await UserModel.findById(memberId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const memberInfo = { userId: user._id, username: user.username, image: user.image, joined: new Date() };
    group.members.push(memberInfo);
    await group.save();

    // Add group ID to the user's groups array
    await UserModel.findByIdAndUpdate(memberId, { $push: { groups: group._id } });

    return res.status(200).json(memberInfo);
  } catch (error) {
    return res.status(error.response?.status || 500).send(error.message);
  }
}

export async function removeUserFromGroupController(req, res) {
  try {
    const { groupId, userId } = req.params;

    const group = await GroupModel.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }
    
    const memberIndex = group.members.findIndex(member => member.userId.toString() === userId);
    if (memberIndex === -1) {
      return res.status(400).json({ message: "User not in group!" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Remove user from the group's members array
    group.members.splice(memberIndex, 1);
    await group.save();

    // Remove group ID from the user's groups array
    await UserModel.findByIdAndUpdate(userId, { $pull: { groups: group._id } });

    return res.status(200).json({ message: `${user.username} removed from ${group.name}` });
  } catch (error) {
    return res.status(error.response?.status || 500).send(error.message);
  }
}

export async function deleteGroupController(req, res) {
  try {
    const { groupId } = req.params;
    const group = await GroupModel.findById(groupId);

    if (group) {
      // Delete associated chores and groceries
      await ChoreModel.deleteMany({ groupId: groupId });
      await GroceryModel.deleteMany({ groupId: groupId });

      await UserModel.updateMany(
        { groups: groupId },
        { $pull: { groups: groupId } }
      )
      
      // Then delete the group
      await GroupModel.findByIdAndDelete(groupId);

      return res.status(200).json({ message: 'Group deleted successfully.' });
    } else {
      return res.status(404).json({ message: "Group not found!" });
    }
  } catch (error) {
    console.error(error);  // Log the entire error object
    return res.status(error.response?.status || 500).send({ message: error.message });
  }
}

export async function updateGroupItemController(req, res) {
  try {
    const { groupId } = req.params
    const group = await GroupModel.findByIdAndUpdate(groupId, req.body)

    return res.status(200).json({ message: 'Group updated successfully.' });
  } catch(error) {
    return res.status(error.response?.status || 500).send({ message: error.message })
  }
}