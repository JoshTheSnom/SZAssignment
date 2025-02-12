using Example.Rest.Api.DataClass;

namespace Example.Rest.Api.Services;

public class RecordGenerator
{
    /// <summary>
    /// Generates a list of n records with random dates between startDate and endDate.
    /// </summary>
    /// <param name="rowsCount">The number of records to generate.</param>
    /// <param name="startDate">The inclusive start of the date range.</param>
    /// <param name="endDate">The exclusive end of the date range.</param>
    /// <returns>List of generated records.</returns>
    public List<RecordDto> GenerateRecords(int rowsCount, DateTime startDate, DateTime endDate)
    {
        if (startDate >= endDate)
            throw new ArgumentException("startDate must be earlier than endDate.");

        var records = new List<RecordDto>();
        var random = new Random();

        for (var i = 0; i < rowsCount; i++)
        {
            var randomDate = GetRandomDate(random, startDate, endDate);
            var recordDto = new RecordDto
            {
                Id = i + 1,
                Label = $"Label {i + 1}",
                Datum = randomDate,
                Name = $"Name {i + 1}"
            };
            records.Add(recordDto);
        }

        return records;
    }

    /// <summary>
    /// Returns a random DateTime between the specified start (inclusive) and end (exclusive).
    /// </summary>
    private static DateTime GetRandomDate(Random random, DateTime start, DateTime end)
    {
        // Calculate the total range of ticks.
        var range = end.Ticks - start.Ticks;
        // Get a random value in that range.
        var randomTicks = (long)(random.NextDouble() * range);
        return new DateTime(start.Ticks + randomTicks);
    }
}