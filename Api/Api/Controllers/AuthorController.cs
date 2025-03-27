using System.Collections.Generic;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces.Helpers;
using Api.Interfaces.Service;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Api.Controllers
{
    [Route("api/authors")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorService;
        private readonly IUserFavoriteAuthorService _favoriteAuthorService;
        private readonly IClaimsHelper _claimsHelper;

        public AuthorController(IAuthorService authorService, IUserFavoriteAuthorService favoriteAuthorService, IClaimsHelper claimsHelper)
        {
            _authorService = authorService;
            _favoriteAuthorService = favoriteAuthorService;
            _claimsHelper = claimsHelper;
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
                var token = Request.Cookies["authToken"];
                string? loggedInUserId = null;

                if (token != null)
                {
                    loggedInUserId = _claimsHelper.GetLoggedInUserId(token);
                }

                List<AuthorLimitedListInfoDto> authors =  await _authorService.GetAllLimitedInfoAsync(loggedInUserId);

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

        [HttpPost("favorite-authors/{authorId}")]
        public async Task<IActionResult> AddAuthorToFavoritesAsync([FromRoute] string authorId, [FromBody] string favoredById)
        {
            var token = Request.Cookies["authToken"];

            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Unauthorized");
            }

            bool success = await _favoriteAuthorService.AddAsync(favoredById, authorId);

            return Ok(success);
        }

        [HttpGet("favorite-authors")]
        public async Task<IActionResult> GetFavoredAuthorsByUserIdAsync()
        {
            var token = Request.Cookies["authToken"];

            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Unauthorized");
            }

            string? loggedInUserId = _claimsHelper.GetLoggedInUserId(token);

            List<AuthorLimitedListDto?> favoritedAuthors = await _favoriteAuthorService.GetFavoredAuthorsByUserIdAsync(loggedInUserId);

            return Ok(favoritedAuthors);
        }

        [HttpGet("favorite-authors/all")]
        public async Task<IActionResult> GetAllFavoritedAuthors()
        {
            List<UserAuthorFavorite?> favoritedAuthors = await _favoriteAuthorService.GetAllUserFavoritesAsync();

            return Ok(favoritedAuthors);
        }
    }
}
