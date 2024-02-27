using System;
using System.Collections.Generic;

namespace designify.Models;

public partial class TblShape
{
    public string IdShape { get; set; } = null!;

    public string? Type { get; set; }

    public string? Styles { get; set; }

    public string IdCanvas { get; set; } = null!;

    public DateOnly? UpdatedAt { get; set; }

    public DateOnly? CreateAt { get; set; }

    public virtual TblCanva IdCanvasNavigation { get; set; } = null!;
}
