using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EKrumynas.Migrations
{
    public partial class OptLock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Version",
                table: "BlogPosts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Version",
                table: "BlogPosts");
        }
    }
}
