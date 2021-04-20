using Microsoft.PowerBI.Api.Models;

namespace Globomantics.PowerBI.Interfaces
{
    public interface IIdentityProvider
    {
        EffectiveIdentity GetUserIdentity();
        EffectiveIdentity GetUserIdentityWithDatasetId(string datasetId);
    }
}
