namespace Api.Helpers
{
    public static class Transform
    {
        public static string FirstCharToUpper(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                return string.Empty;
            }

            return char.ToUpper(input[0]) + input[1..];
        }
    }
}
