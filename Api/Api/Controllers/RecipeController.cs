using Api.Dtos;
using Api.Dtos.Recipe;
using Api.Interfaces.Service;
using Api.Jwt;
using Api.Requests.Recipe;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _recipeService;
        private readonly JwtHandler _jwtHandler;

        public RecipeController(IRecipeService recipeService, JwtHandler jwtHandler)
        {
            _recipeService = recipeService;
            _jwtHandler = jwtHandler;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<RecipeDto> recipeDtos = await _recipeService.GetAllAsync();

            return Ok(recipeDtos);
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            RecipeDto? recipeDto = await _recipeService.GetByIdAsync(id);

            if (recipeDto == null)
            {
                return NotFound();
            }

            return Ok(recipeDto);
        }

        [Route("my-recipes/{userId}")]
        [HttpGet]
        public async Task<IActionResult> GetRecipesByUserId([FromRoute] string userId)
        {
            List<RecipeDto?>? recipeDtos = await _recipeService.GetRecipesByUserId(userId);

            if (recipeDtos == null || recipeDtos.Count == 0)
            {
                return Ok(new List<RecipeDto?>());
            }

            return Ok(recipeDtos);
        }


        [Route("list-information")]
        [HttpGet]
        public async Task<IActionResult> GetRecipeListInformation()
        {
            List<RecipeListInformationDto> RecipeListInformationDtos = await _recipeService.GetRecipeListInformation();

            if (RecipeListInformationDtos == null)
            {
                return NotFound();
            }

            return Ok(RecipeListInformationDtos);
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateRecipeRequest request, [FromRoute] int id)
        {
            RecipeDto? recipeDto = await _recipeService.UpdateAsync(request, id);

            if (recipeDto == null)
            {
                return NotFound();
            }

            return Ok(recipeDto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRecipeRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            RecipeDto recipeDto = await _recipeService.CreateAsync(request);

            return Ok(recipeDto);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var token = Request.Cookies["authToken"];

                if (string.IsNullOrEmpty(token))
                {
                    return Unauthorized(new { message = "Token is missing" });
                }

                var claimsPrincipal = _jwtHandler.ValidateJwtToken(token);
                if (claimsPrincipal == null)
                {
                    return Unauthorized(new { message = "Invalid or expired token" });
                }

                RecipeDto? recipeDto = await _recipeService.DeleteAsync(id, claimsPrincipal);

                if (recipeDto == null)
                {
                    return NotFound();
                }

                return Ok(new { deleted = true, message = "Item deleted successfully" });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
