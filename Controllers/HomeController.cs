using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using designify.Models;

namespace designify.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    private readonly DesignifyContext _context = new DesignifyContext();

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Canva()
    {
        return View("Views/Home/Canva.cshtml");
    }

    public IActionResult Canvas()
    {
        return View("Views/Home/Canvas.cshtml");
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCanvas()
    {
        // Query the database to retrieve all TblCanva entities
        List<TblCanva> canvases = _context.TblCanvas.ToList();

        // Return the retrieved entities as JSON data
        return Json(canvases);
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
