namespace Globomantics.PowerBI.Models
{
    public class TileRedirectionModel
    {
        public TileRedirectionAction Action { get; set; }
    }

    public class TileRedirectionAction
    {
        public TileRedirectionUrl OpenUrl { get; set; }
    }

    public class TileRedirectionUrl
    {
        public string TargetUrl { get; set; }
    }
}
