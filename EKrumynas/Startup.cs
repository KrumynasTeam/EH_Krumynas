using System;
using AutoMapper;
using AutoWrapper;
using EKrumynas.Data;
using EKrumynas.Middleware;
using EKrumynas.Services;
using EKrumynas.Services.Management;
using EKrumynas.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Filters;

namespace EKrumynas
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Setup PostgreSQL connection string - localhost or Heroku
            string connectionString = null;
            string envVar = Environment.GetEnvironmentVariable("DATABASE_URL");

            if (string.IsNullOrEmpty(envVar)) {
                connectionString = Configuration.GetConnectionString("MainDatabaseConnection");
            } else {
                var uri = new Uri(envVar);
                var username = uri.UserInfo.Split(':')[0];
                var password = uri.UserInfo.Split(':')[1];
                connectionString =
                "; Database=" + uri.AbsolutePath.Substring(1) +
                "; Username=" + username +
                "; Password=" + password +
                "; Port=" + uri.Port + ";";
            }

            services.AddDbContext<EKrumynasDbContext>(options =>
                options.UseNpgsql(connectionString));

            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IManageUserService, ManageUserService>();

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<IPotService, PotService>();
            services.AddScoped<IPlantService, PlantService>();
            services.AddScoped<IBouquetService, BouquetService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            string authToken = Environment.GetEnvironmentVariable("TOKEN");

            if (string.IsNullOrEmpty(authToken)) {
                authToken = Configuration.GetSection("AppSettings:Token").Value;
            }

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(authToken)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddAutoMapper(typeof(Startup));

            services.AddControllers();

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
                });
                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "EH Krumynas");
                c.RoutePrefix = string.Empty;
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true)
                .AllowCredentials());


            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseApiResponseAndExceptionWrapper<ResponseWrapper>(
                new AutoWrapperOptions() { 
                    ShowIsErrorFlagForSuccessfulResponse = true, 
                    ShowStatusCode = true });

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
