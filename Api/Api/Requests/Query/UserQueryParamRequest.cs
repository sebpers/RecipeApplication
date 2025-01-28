namespace Api.Requests.Query
{
    public class UserQueryParamRequest
    {
        public string SortBy { get; set; } = "FirstName";
        public string SortOrder { get; set; } = "asc";
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Search { get; set; } = string.Empty;
    }
}
