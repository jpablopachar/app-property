using System.Net;
using Newtonsoft.Json;

namespace server.Middlewares
{
    public class MiddlewareManager
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<MiddlewareManager> _logger;

        public MiddlewareManager(RequestDelegate next, ILogger<MiddlewareManager> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await ManagerExceptionAsync(context, exception, _logger);
            }
        }

        public async Task ManagerExceptionAsync(HttpContext context, Exception exception, ILogger<MiddlewareManager> logger)
        {
            object? errors = null;

            switch (exception)
            {
                case MiddlewareException me:
                    logger.LogError(exception, "MiddlewareException");

                    errors = me.Errors;
                    context.Response.StatusCode = (int)me.StatusCode;

                    break;
                case Exception e:
                    logger.LogError(exception, "Server Error");

                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    break;
            }

            context.Response.ContentType = "application/json";

            var res = string.Empty;

            if (errors != null)
            {
                res = JsonConvert.SerializeObject(new { errors });
            }

            await context.Response.WriteAsync(res);
        }
    }
}