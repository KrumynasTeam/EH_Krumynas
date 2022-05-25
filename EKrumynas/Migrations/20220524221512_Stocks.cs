using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EKrumynas.Migrations
{
    public partial class Stocks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Pots",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "AddableToBouquet",
                table: "Plants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Bouquets",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Bouquets",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Pots");

            migrationBuilder.DropColumn(
                name: "AddableToBouquet",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Plants");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Bouquets");

            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Bouquets");
        }
    }
}
