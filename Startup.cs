using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllersWithViews().AddRazorRuntimeCompilation();

        services.AddMvc(options =>
{
    // Configure cache control headers
    options.CacheProfiles.Add("NoCache", new CacheProfile
    {
        NoStore = true,
        Location = ResponseCacheLocation.None
    });
});
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseHsts();
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseStaticFiles();

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=SignIn}/{action=Index}");
            endpoints.MapControllerRoute(
                name: "canva",
                defaults: new { controller = "Canva", action = "Index" },
                pattern: "Canva/{*id}");
            endpoints.MapControllerRoute(
                name: "layout",
                defaults: new { controller = "Layout", action = "Index" },
                pattern: "layout/{*id}");

        });


    }
}
