namespace Globomantics.PowerBI.Authentication
{
    public class AzureADConfiguration
    {
        // login.microsoftonline.com/tenant-id
        public string AuthorityUri { get; set; }

        // analysis.windows.net/powerbi/api
        public string ResourceUri { get; set; }

        public string ClientId { get; set; }

        public string ClientSecret { get; set; }
    }
}
