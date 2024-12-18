using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Benchmark_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParametersController : ControllerBase
{
    private readonly string _connectionString = "Server=localhost;Database=Benchmark_parameter1;Trusted_Connection=true;";

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var parameters = new List<object>();

        using (SqlConnection conn = new SqlConnection(_connectionString))
        {
            await conn.OpenAsync();

            string selectQuery = @"
                SELECT [Name], [Region], [Description], [Client], [Threads], [Size], [Requests], [Pipeline], [Status]
                FROM Parameter;
            ";

            using (SqlCommand cmd = new SqlCommand(selectQuery, conn))
            {
                using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        parameters.Add(new
                        {
                            Name = reader["Name"].ToString(),
                            Region = reader["Region"].ToString(),
                            Description = reader["Description"].ToString(),
                            Clients = reader["Client"].ToString(),
                            Size = reader["Size"].ToString(),
                            Threads = reader["Threads"].ToString(),
                            Requests = reader["Requests"].ToString(),
                            Pipeline = reader["Pipeline"].ToString(),
                            Status = reader["Status"].ToString()
                        });
                    }
                }
            }
        }

        return Ok(parameters);
    }
}
