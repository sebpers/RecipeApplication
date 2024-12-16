using Api.Data;
using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Repository;
using Api.Mapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            await _context.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        //public Task<CommentDto> Delete(int id)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<List<Comment>> GetRecipeCommentsAsync(int recipeId)
        {
            return await _context.Comments.Where(c => c.RecipeId == recipeId).ToListAsync();
        }

    }
}
