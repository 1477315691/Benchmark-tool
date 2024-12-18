using Microsoft.AspNetCore.Mvc;

namespace Benchmark_API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VMRunController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        // Run the VM
        return "VM is running";
    }
}
