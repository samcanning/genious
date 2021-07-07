using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Genious.Models;

namespace Genious.Services
{
    public class QuestionService : BaseService
    {
        public QuestionService(string sqlConnectionString) : base(sqlConnectionString) { }

        public async Task<List<Question>> GetQuestions()
        {
            DynamicParameters parameters = new DynamicParameters();

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                List<Question> questions = (await connection.QueryAsync<Question>("[dbo].[GetQuestions]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).ToList();
                return questions;
            }
        }
    }
}
