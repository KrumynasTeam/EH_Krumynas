using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EKrumynas.Migrations
{
    public partial class Orders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShoppingCarts_CartId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Orders",
                newName: "Total");

            migrationBuilder.RenameColumn(
                name: "DeliveryMethod",
                table: "Orders",
                newName: "Delivery");

            migrationBuilder.RenameColumn(
                name: "CartId",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_CartId",
                table: "Orders",
                newName: "IX_Orders_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "AddressLine2",
                table: "Orders",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc));

            migrationBuilder.CreateTable(
                name: "ShoppingCartSnapshot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingCartSnapshot", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingCartSnapshot_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BouquetCartItemSnapshots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    CartId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BouquetCartItemSnapshots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BouquetCartItemSnapshots_ShoppingCartSnapshot_CartId",
                        column: x => x.CartId,
                        principalTable: "ShoppingCartSnapshot",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PlantCartItemSnapshots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Color = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    CartId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantCartItemSnapshots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlantCartItemSnapshots_ShoppingCartSnapshot_CartId",
                        column: x => x.CartId,
                        principalTable: "ShoppingCartSnapshot",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PotCartItemSnapshot",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Size = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<int>(type: "integer", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    CartId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PotCartItemSnapshot", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PotCartItemSnapshot_ShoppingCartSnapshot_CartId",
                        column: x => x.CartId,
                        principalTable: "ShoppingCartSnapshot",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BouquetCartItemSnapshots_CartId",
                table: "BouquetCartItemSnapshots",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_PlantCartItemSnapshots_CartId",
                table: "PlantCartItemSnapshots",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_PotCartItemSnapshot_CartId",
                table: "PotCartItemSnapshot",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartSnapshot_OrderId",
                table: "ShoppingCartSnapshot",
                column: "OrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "BouquetCartItemSnapshots");

            migrationBuilder.DropTable(
                name: "PlantCartItemSnapshots");

            migrationBuilder.DropTable(
                name: "PotCartItemSnapshot");

            migrationBuilder.DropTable(
                name: "ShoppingCartSnapshot");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "CartId");

            migrationBuilder.RenameColumn(
                name: "Total",
                table: "Orders",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "Delivery",
                table: "Orders",
                newName: "DeliveryMethod");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                newName: "IX_Orders_CartId");

            migrationBuilder.AlterColumn<string>(
                name: "AddressLine2",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "Orders",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShoppingCarts_CartId",
                table: "Orders",
                column: "CartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id");
        }
    }
}
