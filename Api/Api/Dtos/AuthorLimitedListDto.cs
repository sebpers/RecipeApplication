﻿namespace Api.Dtos
{
    public class AuthorLimitedListDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsFavorited { get; set; }
    }
}
