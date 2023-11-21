using AutoMapper.Internal;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace TeduBlog.Api.Filters
{
    public class SwaggerNullableParameterFilter : IParameterFilter
    {
        public void Apply(OpenApiParameter parameter, ParameterFilterContext context)
        {
            if (!parameter.Schema.Nullable &&
                (context.ApiParameterDescription.Type.IsNullableType() || !context.ApiParameterDescription.Type.IsValueType)) //https://chat.openai.com/share/69dc30f9-3b6f-4df8-896f-de536764354c
            {
                parameter.Schema.Nullable = true;
            }
        }
    }
}
