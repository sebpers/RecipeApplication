using Api.Entities;

namespace Api.Dtos
{
    public class AuthResponseDto
    {
        public bool IsAuthSuccessful { get; set; }
        public User? User { get; set; }
        public IList<string>? Roles { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
