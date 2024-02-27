using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using designify.Models;

namespace designify.Controllers;

public class SignUpController : Controller
{
    private readonly ILogger<SignUpController> _logger;

    private readonly DesignifyContext _context = new DesignifyContext();

    public SignUpController(ILogger<SignUpController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [HttpPost]
    public IActionResult SignUpAccount(TblUser user)
    {
        ViewData["ErrorMessage"] = null;

        if (_context.TblUsers.Any(u => u.Email == user.Email))
        {
            ModelState.AddModelError("Email", "Email is already registered.");
            ViewData["ErrorMessage"] = "Email is already registered.";
            return View("~/Views/SignUp/Index.cshtml");
        }

        // Hash the password before saving it
        // For simplicity, I'm assuming you have a method to hash passwords
        user.Password = HashPassword(user.Password);
        var random = new Random();

        user.IdUser = random.Next().ToString();

        // Save the user to the database
        _context.Add(user);
        _context.SaveChanges();

        return RedirectToAction("Index", "Home");

    }

    // HashPassword method should be implemented according to your hashing algorithm
    private string HashPassword(string password)
    {
        // Implement your password hashing logic here
        // For demonstration purposes, let's assume a simple hashing
        return password;
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
