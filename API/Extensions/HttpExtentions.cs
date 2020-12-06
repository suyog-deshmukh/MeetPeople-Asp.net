using System.Text.Json;
using API.Helper;
using Microsoft.AspNetCore.Http;

namespace API.Extensions
{
    public static class HttpExtentions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPage)
        {
            var paginationHeader = new PaginatorHeader(currentPage, itemsPerPage, totalItems, totalPage);
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}