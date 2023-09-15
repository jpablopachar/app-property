using System.Net;

namespace server.Middlewares
{
    public class MiddlewareException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public object? Errors { get; set; }

        public MiddlewareException(HttpStatusCode statusCode, object? errors = null)
        {
            StatusCode = statusCode;
            Errors = errors;
        }
    }
}