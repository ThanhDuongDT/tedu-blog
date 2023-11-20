using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TeduBlog.Core.ConfigOptions;

namespace TeduBlog.Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtTokenSettings _jwtTokenSettings;
        public TokenService(IOptions<JwtTokenSettings> jwtTokenSetting)
        {
            _jwtTokenSettings = jwtTokenSetting.Value;
        }
        public string GennerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtTokenSettings.Key));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken( //f12 ?
                issuer : _jwtTokenSettings.Issuer,
                audience : _jwtTokenSettings.Issuer,
                claims : claims,
                expires : DateTime.Now.AddHours(_jwtTokenSettings.ExpireInHours),
                signingCredentials : signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public string GennerateRefreshToken()
        {
            var ramdomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(ramdomNumber);
                return Convert.ToBase64String(ramdomNumber);
            } 
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //you might want to validate the audience and issuer depending on your use case
                ValidateIssuer = false,
                ValidateIssuerSigningKey = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtTokenSettings.Key)),
                ValidateLifetime = false //here we are saying that we don't care about the token's expiration date
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken != null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("invalid token");
            return principal;
        }
    }
}
