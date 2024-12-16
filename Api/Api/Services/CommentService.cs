using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Repository;
using Api.Interfaces.Service;
using Api.Mapper;
using Api.Requests.Comment;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Services
{
    public class CommentService : ICommentService
    {
        ICommentRepository _commentRepo;

        public CommentService(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }
        public async Task<List<CommentDto>> GetAllAsync()
        {
            List<Comment> comments = await _commentRepo.GetAllAsync();

            List<CommentDto> commentDtos = comments.Select(c => c.ToCommentDto()).ToList();

            return commentDtos;
        }

        public async Task<List<CommentDto>> GetRecipeCommentsAsync(int recipeId)
        {
            List<Comment> commentModels = await _commentRepo.GetRecipeCommentsAsync(recipeId);

            if (commentModels is null)
            {
                throw new KeyNotFoundException($"No comments found for recipe with ID {recipeId}.");
            }

            List<CommentDto> commentDtos = commentModels.Select(cm => cm.ToCommentDto()).ToList();

            return commentDtos;
        }

        public async Task<CommentDto> CreateAsync(CommentCreateRequest? commentRequest)
        {
            if (commentRequest is null)
            {
                throw new ArgumentNullException(nameof(commentRequest), "Comment data cannot be null.");
            }

            try
            {
                Comment commentModel = commentRequest.ToCommentFromCommentCreateRequest();

                Comment createdCommentModel = await _commentRepo.CreateAsync(commentModel);

                return createdCommentModel.ToCommentDto();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the comment.", ex);
            }
        }

        //public Task<CommentDto> Delete(int id)
        //{
        //    throw new NotImplementedException();
        //}

        
    }
}
