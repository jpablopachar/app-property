using System.Net;
using System.Text.Json;

namespace server.Middlewares
{
    public class ManagerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ManagerMiddleware> _logger;

        public ManagerMiddleware(RequestDelegate next, ILogger<ManagerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        private async Task _ManagerExceptionAsync(HttpContext httpContext, Exception exception, ILogger<ManagerMiddleware> logger)
        {
            object? errors = null;

            switch (exception)
            {
                case MiddlewareException middlewareException:
                    _logger.LogError(middlewareException, "Middleware error");

                    httpContext.Response.StatusCode = (int)middlewareException.StatusCode;
                    errors = middlewareException.Errors;

                    break;
                case Exception ex:
                    _logger.LogError(ex, "Error de servidor");

                    httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    errors = string.IsNullOrWhiteSpace(ex.Message) ? "Error" : ex.Message;

                    break;
            }

            httpContext.Response.ContentType = "application/json";

            var res = string.Empty;

            if (errors != null)
            {
                res = JsonSerializer.Serialize(new { errors });
            }

            await httpContext.Response.WriteAsync(res);
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await _ManagerExceptionAsync(context, exception, _logger);
            }
        }
    }
}