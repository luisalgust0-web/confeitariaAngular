﻿// <auto-generated />
using System;
using CmsConfeitaria.Integration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CmsConfeitaria.Integration.Migrations
{
    [DbContext(typeof(DBContextCm))]
    [Migration("20230203160203_autoGId")]
    partial class autoGId
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Compra", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataCompra")
                        .HasColumnType("datetime2");

                    b.Property<int>("IngredienteId")
                        .HasColumnType("int");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.Property<int>("UnidadeMedidaId")
                        .HasColumnType("int");

                    b.Property<double>("Valor")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("IngredienteId");

                    b.HasIndex("UnidadeMedidaId");

                    b.ToTable("Compra");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Ingrediente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Ingrediente");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Receita", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("datetime2");

                    b.Property<string>("ModoPreparo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Receita");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.ReceitaIngrediente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("datetime2");

                    b.Property<int>("IngredienteId")
                        .HasColumnType("int");

                    b.Property<double>("Quantidade")
                        .HasColumnType("float");

                    b.Property<int>("ReceitaId")
                        .HasColumnType("int");

                    b.Property<int>("UnidadeMedidaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IngredienteId");

                    b.HasIndex("ReceitaId");

                    b.HasIndex("UnidadeMedidaId");

                    b.ToTable("ReceitaIngrediente");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Teste", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.ToTable("Teste", (string)null);
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.UnidadeMedida", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sigla")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UnidadeMedida");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Compra", b =>
                {
                    b.HasOne("CmsConfeitaria.Core.Entity.Ingrediente", "Ingrediente")
                        .WithMany("Compras")
                        .HasForeignKey("IngredienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CmsConfeitaria.Core.Entity.UnidadeMedida", "UnidadeMedida")
                        .WithMany("Compras")
                        .HasForeignKey("UnidadeMedidaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingrediente");

                    b.Navigation("UnidadeMedida");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.ReceitaIngrediente", b =>
                {
                    b.HasOne("CmsConfeitaria.Core.Entity.Ingrediente", "ingrediente")
                        .WithMany("ReceitaIngredientes")
                        .HasForeignKey("IngredienteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CmsConfeitaria.Core.Entity.Receita", "Receita")
                        .WithMany("ReceitaIngredientes")
                        .HasForeignKey("ReceitaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CmsConfeitaria.Core.Entity.UnidadeMedida", "UnidadeMedida")
                        .WithMany("ReceitaIngredientes")
                        .HasForeignKey("UnidadeMedidaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Receita");

                    b.Navigation("UnidadeMedida");

                    b.Navigation("ingrediente");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Ingrediente", b =>
                {
                    b.Navigation("Compras");

                    b.Navigation("ReceitaIngredientes");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.Receita", b =>
                {
                    b.Navigation("ReceitaIngredientes");
                });

            modelBuilder.Entity("CmsConfeitaria.Core.Entity.UnidadeMedida", b =>
                {
                    b.Navigation("Compras");

                    b.Navigation("ReceitaIngredientes");
                });
#pragma warning restore 612, 618
        }
    }
}
