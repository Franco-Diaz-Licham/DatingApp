using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.Server.Models;

[Table("Photos")]
public class PhotoModel
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public int UserId { get; set; }
    public UserModel User { get; set; }
}
