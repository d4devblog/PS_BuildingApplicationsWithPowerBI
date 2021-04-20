using System;

namespace Globomantics.PowerBI.Models
{
    public class ReportEmbedModel
    {
        public Guid Id { get; set; }

        public string EmbedUrl { get; set; }

        public string AccessToken { get; set; }
    }
}
