using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using designify.Models;

namespace designify.Controllers;

public class SignInController : Controller
{
    private readonly ILogger<SignInController> _logger;
    private readonly DesignifyContext _context = new DesignifyContext();

    public SignInController(ILogger<SignInController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult SignInAccount(UserLogin model)
    {
        ViewData["ErrorMessage"] = null;

        if (ModelState.IsValid)
        {
            // Retrieve the user from the database based on the provided email
            var user = _context.TblUsers.FirstOrDefault(u => u.Email == model.Email);

            // Check if the user exists and the password matches
            if (user != null && user.Password == model.Password)
            {
                // Authentication successful, redirect to a secure area or dashboard
                // For now, let's redirect to a simple success page
                return RedirectToAction("Index", "Home");
            }

            // Authentication failed, add a model error
            // ModelState.AddModelError(string.Empty, "Invalid email or password.");
            ViewData["ErrorMessage"] = "Invalid email or password.";

        }
        else
        {
            ViewData["ErrorMessage"] = "Invalid email or password.";
        }

        // If we got this far, something went wrong, redisplay the form with error messages
        return View("Index", model);
    }

    public IActionResult SignInSuccess()
    {
        return View();
    }


    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
