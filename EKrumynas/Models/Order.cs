﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EKrumynas.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OrderStatus
    {
        Ordered,
        Cancelled,
        Overdue,
        Completed
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DeliveryMethod
    {
        Direct,
        ToMailPost,
        Courier,
        SelfPickup
    }

    public class Order
    {
        [Key]
        public int Id { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public OrderStatus Status { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        [Required] public string Country { get; set; }
        [Required] public string Street { get; set; }
        [Required] public string AddressLine1 { get; set; }
        [Required] public string AddressLine2 { get; set; }

        public virtual ShoppingCart Cart { get; set; }
    }
}
