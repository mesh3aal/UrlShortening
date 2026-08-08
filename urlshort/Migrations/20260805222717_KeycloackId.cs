using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace urlshort.Migrations
{
    /// <inheritdoc />
    public partial class KeycloackId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "KeyCloackId",
                table: "Urls",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KeyCloackId",
                table: "Urls");
        }
    }
}
