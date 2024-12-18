using redis.WebAPi.Service.AzureShared;

var builder = WebApplication.CreateBuilder(args);


// 添加 CORS 策略
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});
// 注册 AzureClientFactory
builder.Services.AddScoped<AzureClientFactory>(); // 或者根据需要使用 AddSingleton 或 AddTransient

// 注册 ConnectionVMService
builder.Services.AddScoped<ConnectionVMService>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// 使用 CORS 策略
app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
