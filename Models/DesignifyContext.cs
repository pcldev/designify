using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace designify.Models;

public partial class DesignifyContext : DbContext
{
    public DesignifyContext()
    {
    }

    public DesignifyContext(DbContextOptions<DesignifyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TblCanva> TblCanvas { get; set; }

    public virtual DbSet<TblCanvasConfig> TblCanvasConfigs { get; set; }

    public virtual DbSet<TblShape> TblShapes { get; set; }

    public virtual DbSet<TblUser> TblUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost; Database=DESIGNIFY; User Id=sa; Password=Pcl2k2@gmail.com; Trust Server Certificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TblCanva>(entity =>
        {
            entity.HasKey(e => e.IdCanvas).HasName("PK__tbl_Canv__370F909D2DDAA474");

            entity.ToTable("tbl_Canvas");

            entity.Property(e => e.IdCanvas)
                .HasMaxLength(50)
                .HasColumnName("id_canvas");
            entity.Property(e => e.CreateAt).HasColumnName("create_at");
            entity.Property(e => e.IdUser)
                .HasMaxLength(50)
                .HasColumnName("id_user");
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");

            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.TblCanvas)
                .HasForeignKey(d => d.IdUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Canva__id_us__398D8EEE");
        });

        modelBuilder.Entity<TblCanvasConfig>(entity =>
        {
            entity.HasKey(e => e.IdCanvasConfig).HasName("PK__tbl_Canv__E0044DD846C31398");

            entity.ToTable("tbl_CanvasConfig");

            entity.Property(e => e.IdCanvasConfig)
                .HasMaxLength(50)
                .HasColumnName("id_canvas_config");
            entity.Property(e => e.IdCanvas)
                .HasMaxLength(50)
                .HasColumnName("id_canvas");
            entity.Property(e => e.IdPublic).HasColumnName("id_public");

            // entity.HasOne(d => d.IdCanvasNavigation).WithMany(p => p.TblCanvasConfigs)
            // .HasForeignKey(d => d.IdCanvas)
            // .OnDelete(DeleteBehavior.ClientSetNull)
            // .HasConstraintName("FK__tbl_Canva__id_ca__3F466844");
        });

        modelBuilder.Entity<TblShape>(entity =>
        {
            entity.HasKey(e => e.IdShape).HasName("PK__tbl_Shap__2DCD817FD9C9654A");

            entity.ToTable("tbl_Shape");

            entity.Property(e => e.IdShape)
                .HasMaxLength(50)
                .HasColumnName("id_shape");
            entity.Property(e => e.CreateAt).HasColumnName("create_at");
            entity.Property(e => e.IdCanvas)
                .HasMaxLength(50)
                .HasColumnName("id_canvas");
            entity.Property(e => e.Styles)
                .HasMaxLength(50)
                .HasColumnName("styles");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");

            entity.HasOne(d => d.IdCanvasNavigation).WithMany(p => p.TblShapes)
                .HasForeignKey(d => d.IdCanvas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__tbl_Shape__id_ca__3C69FB99");
        });

        modelBuilder.Entity<TblUser>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PK__tbl_User__D2D1463781C847C4");

            entity.ToTable("tbl_User");

            entity.Property(e => e.IdUser)
                .HasMaxLength(50)
                .HasColumnName("id_user");
            entity.Property(e => e.DateUser).HasColumnName("dateUser");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Gender).HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
