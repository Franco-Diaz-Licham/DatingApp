namespace DatingApp.Server.Extensions;

public static class HttpExtensions
{
    public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages){
        var PaginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
        var options  = new JsonSerializerOptions{ PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        response.Headers.Add("Pagination", JsonSerializer.Serialize(PaginationHeader, options));
        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}
