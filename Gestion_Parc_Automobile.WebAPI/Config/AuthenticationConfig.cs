using Gestion_Utilisateur.Metier.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI.Config
{
    public class TokenResponse
    {
        public string Access_token { get; set; }
        public DateTime? Expires { get; set; }
    }

    public static class AuthenticationConfig
    {
        public static TokenResponse GenerateJSONWebToken(Utilisateur user, IConfiguration configuration)
        {
            //generar cle Wellcome to Boszone 11-11-2019 https://passwordsgenerator.net/sha256-hash-generator/
            TokenResponse tokenResult = new TokenResponse();

            try
            {
                var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var expireToken = DateTime.Now.AddMinutes(60 * 8);

                List<Claim> listClaimsUser = new List<Claim>();
                listClaimsUser.Add(new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]));
                listClaimsUser.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
                listClaimsUser.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()));

                listClaimsUser.Add(new Claim("ID", user.Id.ToString()));
                listClaimsUser.Add(new Claim(ClaimTypes.Email, user.Email));
                listClaimsUser.Add(new Claim(ClaimTypes.Name, (user.Name +" "+ (user.LastName != null ? user.LastName.ToUpper() : "")).Trim()));
                listClaimsUser.Add(new Claim(ClaimTypes.Country, "FR"));
                listClaimsUser.Add(new Claim(ClaimTypes.Role, (user.IdProfil == 1 ? "ADMIN": "USER")));


                var token = new JwtSecurityToken(
                    issuer: configuration["Jwt:Issuer"],
                    audience: configuration["Jwt:Audience"],
                    claims: listClaimsUser.ToArray(),
                    expires: expireToken,
                    /*notBefore: DateTime.UtcNow,*/
                    signingCredentials: credentials);

                var result = new JwtSecurityTokenHandler().WriteToken(token);

                tokenResult.Access_token = result;
                tokenResult.Expires = expireToken;


            }
            catch (Exception ex)
            {
                throw ex;
            }

            return tokenResult;
        }

        public static void ConfigureJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenValidationParams = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidateLifetime = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidateAudience = true,
                RequireSignedTokens = true,
                //use our signig credentials key here optionally we can inject an RSA key as IssuerSigningKey  = new rsaSecurity(rsaparams)
                IssuerSigningKey = credentials.Key,
                ClockSkew = TimeSpan.FromMinutes(30)

            };

            services.AddAuthentication(options => {
                options.DefaultScheme = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {
                options.TokenValidationParameters = tokenValidationParams;
#if DEBUG
                options.RequireHttpsMetadata = false;
#elif PROD || UAT
                options.IncludeErrorDetails = false;
#endif

            });

        }
    }
}
