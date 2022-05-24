using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using EKrumynas.Data;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Security.Claims;
using EKrumynas.Models.Middleware;
using System.IO;
using System.Text.Json;
using EKrumynas.DTOs.User;

namespace EKrumynas.Middleware
{
    public class DatabaseLogger
    {
        private readonly RequestDelegate _next;
        private readonly JsonSerializerOptions _jsonSerializerOptions;

        public DatabaseLogger(RequestDelegate next)
        {
            _next = next;
            _jsonSerializerOptions = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};
        }

        public async Task InvokeAsync(HttpContext context, EKrumynasDbContext dbContext)
        {
            var endpoint = context.GetEndpoint();

            if (endpoint != null)
            {
                var controllerActionDescriptor = endpoint.Metadata.GetMetadata<ControllerActionDescriptor>();

                if (controllerActionDescriptor != null)
                {
                    string controllerName = controllerActionDescriptor.ControllerName;
                    string methodName = controllerActionDescriptor.ActionName;
                    string defaultUsername = "Anonymous";

                    bool isLoginAction = controllerName.Equals("Auth") && methodName.Equals("Login") && context.Request.Method.ToUpper() == "POST";
                    bool isRegisterAction = controllerName.Equals("Auth") && methodName.Equals("Register") && context.Request.Method.ToUpper() == "POST";

                    if (isLoginAction)
                    {
                        string hasLoginUsername = await LoginIdentifier(context);

                        if (!string.IsNullOrEmpty(hasLoginUsername))
                            defaultUsername = hasLoginUsername;
                    } else if (isRegisterAction)
                    {
                        string hasRegisterUsername = await RegisterIdentifier(context);
                        if (!string.IsNullOrEmpty(hasRegisterUsername))
                            defaultUsername = hasRegisterUsername;
                    }

                    string userName = context.User.Identity.Name ?? defaultUsername;
                    string userRole = context.User.FindFirstValue(ClaimTypes.Role) ?? "Undefined";

                    dbContext.ActivityRecords.Add(new ActivityRecord()
                    {
                        Username = userName,
                        Role = userRole,
                        Date = DateTime.UtcNow,
                        Method = controllerName + "#" + methodName
                    });

                    await dbContext.SaveChangesAsync();
                }
            }
            await _next(context);
        }

        private async Task<string> LoginIdentifier(HttpContext context)
        {
            context.Request.EnableBuffering();
            context.Request.Body.Position = 0;

            string json = await new StreamReader(context.Request.Body).ReadToEndAsync();
            UserLoginDto userLoginDto = JsonSerializer.Deserialize<UserLoginDto>(json, _jsonSerializerOptions);

            context.Request.Body.Position = 0;

            if (string.IsNullOrEmpty(userLoginDto.UsernameOrEmail))
                return null;

            return userLoginDto.UsernameOrEmail;
        }

        private async Task<string> RegisterIdentifier(HttpContext context)
        {
            context.Request.EnableBuffering();
            context.Request.Body.Position = 0;

            string json = await new StreamReader(context.Request.Body).ReadToEndAsync();
            UserRegisterDto userRegisterDto = JsonSerializer.Deserialize<UserRegisterDto>(json, _jsonSerializerOptions);

            context.Request.Body.Position = 0;

            if (string.IsNullOrEmpty(userRegisterDto.Username))
                return null;

            return userRegisterDto.Username;
        }
    }
}

