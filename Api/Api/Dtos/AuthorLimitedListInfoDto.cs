﻿using System.ComponentModel.DataAnnotations;
namespace Api.Dtos
{
    public class AuthorLimitedListInfoDto
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public List<UserAuthorFavoriteDto>? FavoritedBy { get; set; }
        public bool IsFavorited { get; set; }
    }
}
