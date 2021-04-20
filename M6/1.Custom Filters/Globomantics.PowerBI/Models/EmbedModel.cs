using System;

namespace Globomantics.PowerBI.Models
{
    public class EmbedModel
    {
        public Guid Id { get; set; }

        public string EmbedUrl { get; set; }

        public string AccessToken { get; set; }
    }
}
