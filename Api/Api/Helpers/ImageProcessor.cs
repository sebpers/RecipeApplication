using Api.Interfaces.Helpers;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;

namespace Api.Helpers
{
    public class ImageProcessor : IImageProcessorHelper
    {
        private const int MaxImageSize = 1 * 1024 * 1024; // 1MB limit
        private const int TargetWidth = 600;
        private const int TargetHeight = 528;
        private const string MaxSizeErrorMessage = "Image size must be less than 1MB.";
        private const string InvalidTypeErrorMessage = "Invalid image type. Allowed types are: JPEG, PNG, GIF, WebP.";

        public async Task<byte[]?> ProcessImageAsync(IFormFile? imageFile)
        {
            if (imageFile is null)
                return null;

            // Validate image
            ValidateImageFileType(imageFile);
            ValidateImageSize(imageFile);

            using var memoryStream = new MemoryStream();
            await imageFile.CopyToAsync(memoryStream);

            memoryStream.Position = 0; // Reset stream position after copy

            var resizedImage = await ResizeImageAsync(memoryStream);

            var compressedImage = await CompressImageAsync(resizedImage);

            // Dispose of the image manually after use
            resizedImage.Dispose();

            return compressedImage;
        }

        private void ValidateImageSize(IFormFile imageFile)
        {
            if (imageFile.Length > MaxImageSize)
            {
                throw new ArgumentException(MaxSizeErrorMessage);
            }
        }

        private void ValidateImageFileType(IFormFile imageFile)
        {
            var allowedImageTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/webp" };

            if (!allowedImageTypes.Contains(imageFile.ContentType.ToLower()))
            {
                throw new ArgumentException(InvalidTypeErrorMessage);
            }
        }

        private async Task<Image> ResizeImageAsync(MemoryStream imageStream)
        {
            // Load the image using ImageSharp
            var image = await Image.LoadAsync(imageStream);

            // Resize while maintaining aspect ratio
            image.Mutate(x => x.Resize(TargetWidth, TargetHeight, KnownResamplers.Lanczos3));

            return image;
        }

        private async Task<byte[]> CompressImageAsync(Image image)
        {
            using var outputStream = new MemoryStream();

            // Save the image as JPEG with compression quality
            var encoder = new JpegEncoder()
            {
                Quality = 85 // Adjust the quality for compression (0-100)
            };

            await image.SaveAsync(outputStream, encoder);

            // Check if the compressed image size is under the 1MB limit
            if (outputStream.Length > MaxImageSize)
            {
                throw new ArgumentException(MaxSizeErrorMessage);
            }

            return outputStream.ToArray();
        }
    }
}
