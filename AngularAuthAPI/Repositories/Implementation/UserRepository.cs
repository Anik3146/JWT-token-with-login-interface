using AngularAuthAPI.Context;
using AngularAuthAPI.Models;
using AngularAuthAPI.Repositories.Interface;

namespace AngularAuthAPI.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext dbContext;
        public UserRepository(AppDbContext dbContext)
        {
               this.dbContext = dbContext;
        }
        public async Task<User> CreateAsync(User userObj)
        {
            await dbContext.Users.AddAsync(userObj);
            await dbContext.SaveChangesAsync();

            return userObj;
        }
    }
}
