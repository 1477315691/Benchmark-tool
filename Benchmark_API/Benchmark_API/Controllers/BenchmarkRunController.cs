using Microsoft.AspNetCore.Mvc;
using Benchmark_API.Models;
using Microsoft.AspNetCore.Cors;
using redis.WebAPi.Service.AzureShared; // 引入 ConnectionVMService
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Benchmark_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowSpecificOrigin")] // 启用 CORS 策略
    public class BenchmarkRunController : ControllerBase
    {
        private readonly ConnectionVMService _connectionVMService;

        // 通过构造函数注入 ConnectionVMService
        public BenchmarkRunController(ConnectionVMService connectionVMService)
        {
            _connectionVMService = connectionVMService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        // 接收前端参数，然后放入数据库并调用 VM 操作
        [HttpPost]
        public async Task<IActionResult> Post(RunBenchmarkViewModel model)
        {
            // 插入数据到数据库
            string ConnectionString = "Server=localhost;Database=Benchmark_parameter1;Trusted_Connection=true;";
            string insertQuery = @"
                INSERT INTO Parameter (Name,Region,Description,Client,Threads,Size,Requests,Pipeline,Status)
                VALUES (@Name,@Region,@Description,@Client,@Threads,@Size,@Requests,@Pipeline,@Status);
            ";

            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(insertQuery, conn))
                {
                    // 添加参数
                    cmd.Parameters.AddWithValue("@Name", model.Name);
                    cmd.Parameters.AddWithValue("@Region", model.Region);
                    cmd.Parameters.AddWithValue("@Description", model.Description);
                    cmd.Parameters.AddWithValue("@Client", model.Clients);
                    cmd.Parameters.AddWithValue("@Threads", model.Threads);
                    cmd.Parameters.AddWithValue("@Size", model.Size);
                    cmd.Parameters.AddWithValue("@Requests", model.Requests);
                    cmd.Parameters.AddWithValue("@Pipeline", model.Pipeline);
                    cmd.Parameters.AddWithValue("@Status", "1");

                    // 执行插入操作
                    int rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine($"插入成功，影响行数: {rowsAffected}");
                }

                conn.Close();
            }

            // 调用 ConnectionVMService 执行虚拟机操作并获取输出
            try
            {
                // 将参数传递给 ConnectionVMService
                string vmOutput = await _connectionVMService.ConnectionVM(
                    model.Name,
                    model.Primary,
                    model.Clients,
                    model.Threads,
                    model.Size,
                    model.Requests,
                    model.Pipeline,
                    model.Times
                );

                // 返回执行结果
                return Ok(new { message = "Benchmark run completed successfully", output = vmOutput });
            }
            catch (Exception ex)
            {
                // 发生异常时返回错误信息
                return StatusCode(500, new { message = "Error occurred during benchmark execution", error = ex.Message });
            }
        }
    }
}
