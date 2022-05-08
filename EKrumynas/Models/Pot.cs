﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EKrumynas.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum PotSize
    {
        Small,
        Medium,
        Large
    }

    public class Pot
    {
        [Key]
        public int Id { get; set; }
        public PotSize Size { get; set; }
        public ProductColor Color { get; set; }
        public decimal Price { get; set; }

        public virtual Product Product { get; set; }

    }
}
