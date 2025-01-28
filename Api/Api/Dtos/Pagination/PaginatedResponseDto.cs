namespace Api.Dtos.Pagination
{
    public class PaginatedResponseDto<T>
    {
        public int TotalCount { get; set; }
        public List<T> Items { get; set; }
    }
}
