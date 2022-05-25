using System.Collections.Generic;

namespace EKrumynas.Services
{
    public class ItemVariants<T1, T2>
    {
        public T1 Item { get; set; }
        public IList<T2> Variants { get; set; }
    }
}
