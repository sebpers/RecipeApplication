using Api.Dtos;
using Api.Interfaces.Service;
using Api.Requests.Comment;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("/api/comments")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<CommentDto> commentDtos = await _commentService.GetAllAsync();

            return Ok(commentDtos);
        }

        [HttpGet("recipe-comments/{recipeId}")]
        public async Task<IActionResult> GetRecipeComments([FromRoute] int recipeId)
        {
            try
            {
                List<CommentDto> commentDtos = await _commentService.GetRecipeCommentsAsync(recipeId);
                return Ok(commentDtos);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle unexpected exceptions
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CommentCreateRequest commentRequest)
        {
            if (commentRequest == null)
            {
                return BadRequest("Comment data is required.");
            }

            try
            {
                CommentDto commentDto = await _commentService.CreateAsync(commentRequest);

                return CreatedAtAction(nameof(Create), new { id = commentDto.Id }, commentDto);
            }
            catch (ArgumentNullException ex)
            {
                // Handle specific validation exceptions
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle unexpected exceptions
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
    }
}
