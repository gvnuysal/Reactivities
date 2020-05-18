using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (System.Exception ex)
            {
                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;
            switch (ex)
            {
                case RestException rest:
                    logger.LogError(ex, "REST ERROR");
                    errors = rest.Errors;
                    context.Response.StatusCode = (int)rest.Code;
                    break;
                    case Exception exception:
                    logger.LogError(ex,"SERVER ERROR");
                    errors=string.IsNullOrWhiteSpace(exception.Message)?"Error":exception.Message;
                    context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                    break;
                default:
                    break;
            }
            context.Response.ContentType="application/json";
            if(errors!=null){
                var result=JsonSerializer.Serialize(new {
                   errors
                });
                await context.Response.WriteAsync(result);
            }
        }
    }
}