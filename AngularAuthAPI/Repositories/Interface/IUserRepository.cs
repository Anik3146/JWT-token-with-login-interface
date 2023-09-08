using AngularAuthAPI.Models;

namespace AngularAuthAPI.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<User> CreateAsync(User user);
    }
}
