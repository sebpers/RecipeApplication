namespace Api.Dtos.Statistic
{
    public class UserStatisticResponseDto
    {
        public List<PieChartDataDto> RoleDistribution { get; set; }
        public List<PieChartDataDto> RecipeDistribution { get; set; }
        public List<PieChartDataDto> UserCreationTimeSpan { get; set; }
    }
}
