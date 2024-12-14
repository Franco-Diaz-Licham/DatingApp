namespace DatingApp.Library.Models;

public class UserModel
{
    public int Id { get; set; }
    [Required]
    public string Username { get; set; } = string.Empty;
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime LastActive { get; set; } = DateTime.Now;
    public string Gender { get; set; }
    public string? Introduction {get; set;}
    public string LookingFor { get; set; } = string.Empty;
    public string Interests { get; set; } = string.Empty;
    public string City { get; set; }
    public string Country { get; set; }
    public ICollection<PhotoModel> Photos { get; set; }

    public int GetAge(){
        return DateOfBirth.CalculateAge();
    }
}