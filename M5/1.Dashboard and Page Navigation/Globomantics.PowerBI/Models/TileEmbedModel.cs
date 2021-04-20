using System;

namespace Globomantics.PowerBI.Models
{
    public class TileEmbedModel
    {
        public Guid Id { get; set; }

        public Guid DashboardId { get; set; }

        public string EmbedUrl { get; set; }

        public string AccessToken { get; set; }
    }
}
