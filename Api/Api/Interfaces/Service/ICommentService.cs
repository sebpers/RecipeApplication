using Api.Dtos;
using Api.Entities;
using Api.Requests.Comment;

namespace Api.Interfaces.Service
{
    public interface ICommentService
    {
        Task<List<CommentDto>> GetAllAsync();
        Task<CommentDto> CreateAsync(CommentCreateRequest comment);
        Task<List<CommentDto>> GetRecipeCommentsAsync(int recipeId);
        //Task<CommentDto> Delete(int id);
    }
}
