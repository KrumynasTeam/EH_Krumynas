using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EKrumynas.Migrations
{
    public partial class Logger_Middleware : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BouquetCartItems_Bouquets_BouquetId",
                table: "BouquetCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BouquetCartItems_ShoppingCarts_ShoppingCartId",
                table: "BouquetCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BouquetItem_Plants_PlantId",
                table: "BouquetItem");

            migrationBuilder.DropForeignKey(
                name: "FK_Bouquets_Products_ProductId",
                table: "Bouquets");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShoppingCarts_ShoppingCartId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_PlantCartItems_ShoppingCarts_ShoppingCartId",
                table: "PlantCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Products_ProductId",
                table: "Plants");

            migrationBuilder.DropForeignKey(
                name: "FK_PotCartItems_Pots_PotId",
                table: "PotCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PotCartItems_ShoppingCarts_ShoppingCartId",
                table: "PotCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Pots_Products_ProductId",
                table: "Pots");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ShoppingCartId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_BouquetItem_PlantId",
                table: "BouquetItem");

            migrationBuilder.DropColumn(
                name: "ShoppingCartId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Pots",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "PotCartItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PotId",
                table: "PotCartItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Plants",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "PlantCartItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "CartId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Bouquets",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "PlantId",
                table: "BouquetItem",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "BouquetCartItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "BouquetId",
                table: "BouquetCartItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "ActivityRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: true),
                    Role = table.Column<string>(type: "text", nullable: true),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Method = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityRecords", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CartId",
                table: "Orders",
                column: "CartId");

            migrationBuilder.AddForeignKey(
                name: "FK_BouquetCartItems_Bouquets_BouquetId",
                table: "BouquetCartItems",
                column: "BouquetId",
                principalTable: "Bouquets",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BouquetCartItems_ShoppingCarts_ShoppingCartId",
                table: "BouquetCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bouquets_Products_ProductId",
                table: "Bouquets",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShoppingCarts_CartId",
                table: "Orders",
                column: "CartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlantCartItems_ShoppingCarts_ShoppingCartId",
                table: "PlantCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Products_ProductId",
                table: "Plants",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PotCartItems_Pots_PotId",
                table: "PotCartItems",
                column: "PotId",
                principalTable: "Pots",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PotCartItems_ShoppingCarts_ShoppingCartId",
                table: "PotCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pots_Products_ProductId",
                table: "Pots",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BouquetCartItems_Bouquets_BouquetId",
                table: "BouquetCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_BouquetCartItems_ShoppingCarts_ShoppingCartId",
                table: "BouquetCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Bouquets_Products_ProductId",
                table: "Bouquets");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_ShoppingCarts_CartId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_PlantCartItems_ShoppingCarts_ShoppingCartId",
                table: "PlantCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Plants_Products_ProductId",
                table: "Plants");

            migrationBuilder.DropForeignKey(
                name: "FK_PotCartItems_Pots_PotId",
                table: "PotCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PotCartItems_ShoppingCarts_ShoppingCartId",
                table: "PotCartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_Pots_Products_ProductId",
                table: "Pots");

            migrationBuilder.DropTable(
                name: "ActivityRecords");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CartId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Pots",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "PotCartItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PotId",
                table: "PotCartItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "PlantCartItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShoppingCartId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Bouquets",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PlantId",
                table: "BouquetItem",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingCartId",
                table: "BouquetCartItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BouquetId",
                table: "BouquetCartItems",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ShoppingCartId",
                table: "Orders",
                column: "ShoppingCartId");

            migrationBuilder.CreateIndex(
                name: "IX_BouquetItem_PlantId",
                table: "BouquetItem",
                column: "PlantId");

            migrationBuilder.AddForeignKey(
                name: "FK_BouquetCartItems_Bouquets_BouquetId",
                table: "BouquetCartItems",
                column: "BouquetId",
                principalTable: "Bouquets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BouquetCartItems_ShoppingCarts_ShoppingCartId",
                table: "BouquetCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BouquetItem_Plants_PlantId",
                table: "BouquetItem",
                column: "PlantId",
                principalTable: "Plants",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Bouquets_Products_ProductId",
                table: "Bouquets",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_ShoppingCarts_ShoppingCartId",
                table: "Orders",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlantCartItems_ShoppingCarts_ShoppingCartId",
                table: "PlantCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Plants_Products_ProductId",
                table: "Plants",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PotCartItems_Pots_PotId",
                table: "PotCartItems",
                column: "PotId",
                principalTable: "Pots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PotCartItems_ShoppingCarts_ShoppingCartId",
                table: "PotCartItems",
                column: "ShoppingCartId",
                principalTable: "ShoppingCarts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pots_Products_ProductId",
                table: "Pots",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
