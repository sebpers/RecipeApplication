using System.ComponentModel.DataAnnotations;

namespace Api.Requests.Authentication
{
    public class UserForAuthenticationRequest
    {
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
