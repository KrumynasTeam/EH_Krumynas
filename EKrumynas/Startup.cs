using System;
using AutoMapper;
using AutoWrapper;
using EKrumynas.Data;
using EKrumynas.Middleware;
using EKrumynas.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace EKrumynas
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


            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IBlogService, BlogService>();
            services.AddScoped<IPotService, PotService>();
            services.AddScoped<IPlantService, PlantService>();
            services.AddScoped<IBouquetService, BouquetService>();

            services.AddAutoMapper(typeof(Startup));
            //services.AddCors();

            services.AddControllers();

            // Swagger Service
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials


            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseApiResponseAndExceptionWrapper<ResponseWrapper>(
                new AutoWrapperOptions() { 
                    ShowIsErrorFlagForSuccessfulResponse = true, 
                    ShowStatusCode = true });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
