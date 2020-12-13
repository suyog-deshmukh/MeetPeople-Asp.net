using System.Threading.Tasks;
using System.Collections.Generic;
using API.Entities;
using API.Helper;
using API.DTOs;

namespace API.Interface
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);

        void DeleteMessage(Message messge);

        Task<Message> GetMessage(int id);

        Task<PageList<MessageDto>> GetMessagesForUser(MessageParams messageParams);

        Task<IEnumerable<MessageDto>> GetMessagesThread(string currentUsername, string recipientUsername);

        Task<bool> SaveAllAsync();
        
    }
}