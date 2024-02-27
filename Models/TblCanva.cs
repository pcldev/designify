using System;
using System.Collections.Generic;

namespace designify.Models;

public partial class TblCanva
{
    public string IdCanvas { get; set; } = null!;

    public string Title { get; set; } = null!;

    public DateOnly? UpdatedAt { get; set; }

    public DateOnly? CreateAt { get; set; }

    public string IdUser { get; set; } = null!;

    public virtual TblUser IdUserNavigation { get; set; } = null!;

    public virtual ICollection<TblCanvasConfig> TblCanvasConfigs { get; set; } = new List<TblCanvasConfig>();

    public virtual ICollection<TblShape> TblShapes { get; set; } = new List<TblShape>();
}
