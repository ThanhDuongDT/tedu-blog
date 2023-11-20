using System.Security.Claims;

namespace TeduBlog.Api.Services
{
    public interface ITokenService
    {
        string GennerateAccessToken(IEnumerable<Claim> claims);
        string GennerateRefreshToken();
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
