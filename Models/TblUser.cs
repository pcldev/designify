using System;
using System.Collections.Generic;

namespace designify.Models;

public partial class TblUser
{
    public string IdUser { get; set; } = null!;

    public string Name { get; set; } = null!;

    public bool? Gender { get; set; }

    public DateOnly? DateUser { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<TblCanva> TblCanvas { get; set; } = new List<TblCanva>();
}
