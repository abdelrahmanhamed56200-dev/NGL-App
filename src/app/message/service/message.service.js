import { AppError } from '../../../lib/error/error.js';
import { userNotExist } from '../../user/errors.js';
import * as userRepository from '../../user/repository/user.repository.js'
import * as messageRepository from '../repository/message.repository.js'
export async function sendMessage(content,receiver,sender) {
const user = await userRepository.findUserById(receiver);
if(!user) throw userNotExist
  return await  messageRepository.createMessage(content,receiver,sender)
}

export async function getAllMessages(userId) {
   const messages = await messageRepository.getAllMessage(userId);
   if(messages.length === 0 ) throw new AppError('no messages found',404);
   return messages
}