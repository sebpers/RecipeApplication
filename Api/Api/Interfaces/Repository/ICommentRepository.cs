using Api.Dtos;
using Api.Entities;

namespace Api.Interfaces.Repository
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<Comment> CreateAsync(Comment comment);
        Task<List<Comment>> GetRecipeCommentsAsync(int recipeId);

        //Task<CommentDto> Delete(int id);
    }
}
