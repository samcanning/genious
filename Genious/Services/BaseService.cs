namespace Genious.Services
{
    public class BaseService
    {
        public readonly string SqlConnectionString;

        public BaseService(string sqlConnectionString)
        {
            SqlConnectionString = sqlConnectionString;
        }
    }
}
