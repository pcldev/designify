using System;
using System.Collections.Generic;

namespace designify.Models;

public partial class TblCanvasConfig
{
    public string IdCanvasConfig { get; set; } = null!;

    public string IdCanvas { get; set; } = null!;

    public bool? IdPublic { get; set; }

    public virtual TblCanva IdCanvasNavigation { get; set; } = null!;
}
