using Example.Rest.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Changing CORS restriction here, because proxy does not seem to work
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp"); //Allowing React to "avoid" CORS 
app.UseHttpsRedirection();

var service = new RecordGenerator();
app.MapGet("/data", () 
        => service.GenerateRecords
        (
            150,
            DateTime.UtcNow.AddYears(-1),
            DateTime.UtcNow.AddYears(1))
        )
    .WithName("DataController")
    .WithOpenApi();

app.Run();

