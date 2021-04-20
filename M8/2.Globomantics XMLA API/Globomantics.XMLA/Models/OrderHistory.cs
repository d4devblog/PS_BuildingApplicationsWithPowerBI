using System;

namespace Globomantics.XMLA.Models
{
    public class OrderHistory
    {
        public long CustomerId { get; set; }
        public long OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public long NumberOfItems { get; set; }
        public long? ItemsReturned { get; set; }
        public decimal? SalesValue { get; set; }
    }
}