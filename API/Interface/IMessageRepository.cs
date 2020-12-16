using System.Threading.Tasks;
using System.Collections.Generic;
using API.Entities;
using API.Helper;
using API.DTOs;

namespace API.Interface
{
    public interface IMessageRepository
    {
        void AddGroup(Group group);

        void RemoveConnection(Connection connection);

        Task<Connection> GetConnection(string connectionId);

        Task<Group> GetMessageGroup(string groupName);
        Task<Group> GetGroupForConnection(string connectionId);
        void AddMessage(Message message);

        void DeleteMessage(Message messge);

        Task<Message> GetMessage(int id);

        Task<PageList<MessageDto>> GetMessagesForUser(MessageParams messageParams);

        Task<IEnumerable<MessageDto>> GetMessagesThread(string currentUsername, string recipientUsername);

        
    }
}