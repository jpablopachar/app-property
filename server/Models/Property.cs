using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Property
    {
		[Key]
		[Required]
        public int propertyId { get; set; }
		public string? name { get; set; }
		public string? address { get; set; }

		[Required]
		[Column(TypeName = "decimal(18,4)")]
		public int? price { get; set; }
		public string? picture { get; set; }
		public DateTime? createdAt { get; set; }
    }
}