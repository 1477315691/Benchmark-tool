using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Benchmark_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DataController : ControllerBase
{
     private readonly string _connectionString = "Server=localhost;Database=Benchmark_parameter1;Trusted_Connection=true;";

    [HttpGet("AllData")]
    public async Task<IActionResult> Get()
    {
        var parameters = new List<object>();

        using (SqlConnection conn = new SqlConnection(_connectionString))
        {
            await conn.OpenAsync();

            string selectQuery = @"
                SELECT [ID], [CacheName], [TotalDuration], [TimeUnit], [GetsRPS], [GetsAverageLatency], [GetsP50], [GetsP99], [GetsP99_90], [GetsP99_99]
                FROM BenchmarkData1;
            ";

            using (SqlCommand cmd = new SqlCommand(selectQuery, conn))
            {
                using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        parameters.Add(new
                        {
                            Id = reader["ID"].ToString(),
                            CacheName = reader["CacheName"].ToString(),
                            TotalDuration = reader["TotalDuration"].ToString(),
                            TimeUnit = reader["TimeUnit"].ToString(),
                            GetsRPS = reader["GetsRPS"].ToString(),
                            GetsAverageLatency = reader["GetsAverageLatency"].ToString(),
                            GetsP50 = reader["GetsP50"].ToString(),
                            GetsP99 = reader["GetsP99"].ToString(),
                            GetsP99_90 = reader["GetsP99_90"].ToString(),
                            GetsP99_99 = reader["GetsP99_99"].ToString(),
                        });
                    }
                }
            }
        }

        return Ok(parameters);
    }
    [HttpGet("FinalData")]
    public async Task<IActionResult> FinalGet()
    {
        var parameters = new List<object>();

        using (SqlConnection conn = new SqlConnection(_connectionString))
        {
            await conn.OpenAsync();

            string selectQuery = @"
                SELECT [ID], [CacheName], [TotalDuration], [TimeUnit], [GetsRPS], [GetsAverageLatency], [GetsP50], [GetsP99], [GetsP99_90], [GetsP99_99]
                FROM FinalBenchmarkData;
            ";

            using (SqlCommand cmd = new SqlCommand(selectQuery, conn))
            {
                using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        parameters.Add(new
                        {
                            Id = reader["ID"].ToString(),
                            CacheName = reader["CacheName"].ToString(),
                            TotalDuration = reader["TotalDuration"].ToString(),
                            TimeUnit = reader["TimeUnit"].ToString(),
                            GetsRPS = reader["GetsRPS"].ToString(),
                            GetsAverageLatency = reader["GetsAverageLatency"].ToString(),
                            GetsP50 = reader["GetsP50"].ToString(),
                            GetsP99 = reader["GetsP99"].ToString(),
                            GetsP99_90 = reader["GetsP99_90"].ToString(),
                            GetsP99_99 = reader["GetsP99_99"].ToString(),
                        });
                    }
                }
            }
        }

        return Ok(parameters);
    }
}

