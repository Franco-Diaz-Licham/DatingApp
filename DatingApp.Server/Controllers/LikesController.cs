namespace DatingApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LikesController : ControllerBase
{
    private readonly IUserRepository _userRepo;
    private readonly IMapper _mapper;
    private readonly ILikesRepository _likesRepo;

    public LikesController(IUserRepository userRepo, ILikesRepository likesRepo, IMapper mapper)
    {
        _likesRepo = likesRepo;
        _userRepo = userRepo;
        _mapper = mapper;
    }

    [HttpPost("{username}")]
    public async Task<ActionResult> AddLike(string username)
    {
        var sourceUserId = User.GetUserId();
        var likedUser = await _userRepo.GetUserByUsernameAsync(username);
        var sourceUser = await _likesRepo.GetUserWithLikes(sourceUserId);

        if (likedUser == null) return NotFound();
        if (sourceUser.Username == username) return BadRequest("You cannot like yourself");

        var userLike = await _likesRepo.GetUserLike(sourceUserId, likedUser.Id);

        if (userLike != null) return BadRequest("You already liked this user");

        userLike = new UserLikeModel(sourceUserId, likedUser.Id);
        sourceUser.LikedUsers.Add(userLike);

        if(await _userRepo.SaveAllAsync()) return Ok();
        return BadRequest("Failed to liked user");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams){
        likesParams.UserId = User.GetUserId();
        var output = await _likesRepo.GetUserLikes(likesParams);
        Response.AddPaginationHeader(output.CurrentPage, output.PageSize, output.TotalCount, output.TotalPages);
        return Ok(output);
    }
}
