namespace EKrumynas.Models
{
    public class PotCartItem
    {
        public int Id { get; set; }
        public int ShoppingCartId { get; set; }
        public int PotId { get; set; }
        public int Quantity { get; set; }

        public virtual ShoppingCart ShoppingCart { get; set; }
        public virtual Pot Pot { get; set; }
    }
}
