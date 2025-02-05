namespace Api.Interfaces.Helpers
{
    public interface IImageProcessorHelper
    {
        Task<byte[]?> ProcessImageAsync(IFormFile? imageFile);
    }
}
