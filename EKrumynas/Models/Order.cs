using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using EKrumynas.Models.OrderDetails;

namespace EKrumynas.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        Ordered,
        Accepted,
        Cancelled,
        Packing,
        Delivering,
        Completed
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Delivery
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
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Required] public Status Status { get; set; }
        [Required] public Delivery Delivery { get; set; }

        [Required] public string Country { get; set; }
        [Required] public string Street { get; set; }
        [Required] public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }

        public virtual ShoppingCartSnapshot Cart { get; set; }
        #nullable enable
        public virtual User? User { get; set; }
        #nullable disable

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
