using Api.Dtos;
using Api.Entities;
using Api.Requests.Comment;

namespace Api.Mapper
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Description = commentModel.Description,
                Name = commentModel.Name,
                UserId = commentModel.UserId,
                CreatedAt = commentModel.CreatedAt,
                RecipeId = commentModel.RecipeId
            };
        }

        public static Comment ToCommentFromCommentCreateRequest(this CommentCreateRequest comment)
        {
            return new Comment
            {
                Title = comment.Title,
                Description = comment.Description,
                Name = comment.Name,
                RecipeId = comment.RecipeId,
                UserId = comment.UserId
            };
        }
    }
}
