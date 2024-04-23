using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using designify.Models;
using System.Text.Json.Nodes;
using Microsoft.EntityFrameworkCore;

namespace designify.Controllers;

public class CanvaController : Controller
{
    private readonly ILogger<CanvaController> _logger;
    private readonly DesignifyContext _context = new DesignifyContext();

    public CanvaController(ILogger<CanvaController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index(string id)
    {
        return View("Views/Canva/Index.cshtml");
    }

    // public IActionResult Save()
    // {
    //     var jsonData = new
    //     {
    //         Name = "John Doe",
    //         Age = 30,
    //         Email = "john.doe@example.com"
    //     };

    //     return Json(jsonData);
    // }

    [HttpPost]
    public async Task<IActionResult> GetCanva([FromBody] JsonObject payload)
    {
        string _id = (string)payload["id"];

        TblCanva existingCanva = await _context.TblCanvas.FindAsync(_id);

        var JsonObject = Json(new { success = true, canva = existingCanva });

        return JsonObject;
    }

    [HttpPost]
    public async Task<IActionResult> Save([FromBody] JsonObject canvaData)
    {
        string canvaId = (string)canvaData["id_canvas"];
        string title = (string)canvaData["title"];
        string elements = (string)canvaData["elements"];
        string id_user = (string)canvaData["id_user"];
        string verify_key = (string)canvaData["verify_key"];


        TblCanva existingCanva = await _context.TblCanvas.FindAsync(canvaId);

        if (existingCanva != null)
        {
            // Update the existing canva
            existingCanva.Title = title;
            existingCanva.Elements = elements;
            existingCanva.VerifyKey = verify_key;

            // existingCanva.UpdatedAt = DateTime.UtcNow.Date; // Update the updated date
            // Update other properties as needed

            // Update TblShapes if needed
            // For example:
            // existingCanva.TblShapes = canvaData.TblShapes;

            _context.Entry(existingCanva).State = EntityState.Modified;
        }
        else
        {
            // Create a new canva
            // canvaData.CreateAt = DateTime.UtcNow; // Set the create date
            // Set other properties as needed
            TblCanva canva = new TblCanva()
            {
                IdCanvas = canvaId,
                Title = title,
                Elements = elements,
                IdUser = id_user,
                VerifyKey = verify_key
            };

            _context.TblCanvas.Add(canva);
        }

        await _context.SaveChangesAsync();

        var JsonObject = Json(new { success = true, message = "Canva saved successfully." });

        return JsonObject;
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
