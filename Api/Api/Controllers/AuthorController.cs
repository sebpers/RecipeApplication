using Api.Dtos;
using Api.Entities;
using Api.Interfaces.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/authors")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                List<AuthorDto> authors = await _authorService.GetAllAsync();
                return Ok(authors);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("author-list")]
        public async Task<IActionResult> GetAllLimitedInfoAsync()
        {
            try
            {
                List<AuthorLimitedListInfoDto> authors = await _authorService.GetAllLimitedInfoAsync();
                return Ok(authors);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
