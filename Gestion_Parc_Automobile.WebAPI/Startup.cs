using Gestion_Parc_Automobile.Metier;
using Gestion_Parc_Automobile.Metier.Contracts;
using Gestion_Parc_Automobile.Metier.Data;
using Gestion_Parc_Automobile.Metier.Repository;
using Gestion_Parc_Automobile.WebAPI.Config;
using Gestion_Utilisateur.Metier;
using Gestion_Utilisateur.Metier.Contracts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gestion_Parc_Automobile.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppGestionUtilisateurDbContext>(opt => opt.UseInMemoryDatabase("InMem"));
            services.AddScoped<IUtilisateurRepository, UtilisateurRepository>();

            services.AddDbContext<AppParcAutomobileDbContext>(opt => opt.UseInMemoryDatabase("InMem"));
            services.AddScoped<IColeurRepository, ColeurRepository>();
            services.AddScoped<IMarqueRepository, MarqueRepository>();
            services.AddScoped<IModeleRepository, ModeleRepository>();
            services.AddScoped<IStatutRepository, StatutRepository>();
            services.AddScoped<IVoitureRepository, VoitureRepository>();
            services.AddScoped<IReserveRepository, ReserveRepository>();


            AuthenticationConfig.ConfigureJwtAuthentication(services, Configuration);
            
            services.AddControllers();

            var allowedDomains = new[] { "http://localhost:4200" };

            services.AddCors(options =>
            {
                options.AddPolicy(name: "EnabledCORS",
                builder => builder.WithOrigins(allowedDomains).AllowAnyHeader()
                                                             .AllowAnyMethod()
                                                             .SetIsOriginAllowed((host) => true)
                                                             .AllowCredentials().Build());

            });

            // Start Registering and Initializing AutoMapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Gestion_Parc_Automobile.WebAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("EnabledCORS");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gestion_Parc_Automobile.WebAPI v1"));
            }

            PrepPopulation_ParcAutomobile(app);
            PrepPopulation_GestionUtilisateurs(app);

          //  app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


        public static void PrepPopulation_ParcAutomobile(IApplicationBuilder app)
        {
            using (var servicesScope = app.ApplicationServices.CreateScope())
            {
                PreparePopulationDB.SeedData(servicesScope.ServiceProvider.GetService<AppParcAutomobileDbContext>());
            }
        }


        public static void PrepPopulation_GestionUtilisateurs(IApplicationBuilder app)
        {
            using (var servicesScope = app.ApplicationServices.CreateScope())
            {
                PreparePopulationDBUtilisateur.SeedData(servicesScope.ServiceProvider.GetService<AppGestionUtilisateurDbContext>());
            }
        }
    }
}
