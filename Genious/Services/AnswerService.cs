using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Genious.Models;

namespace Genious.Services
{
    public class AnswerService : BaseService
    {
        public AnswerService(string sqlConnectionString) : base(sqlConnectionString) { }

        public async Task<int> CreateAnswer(int questionId, int characterId, AnswerValue value)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@questionId", questionId);
            parameters.Add("@characterId", characterId);
            parameters.Add("@value", value);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                int i = (await connection.QueryAsync<int>("[dbo].[CreateAnswer]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();
                return i;
            }
        }

        public async Task<List<Answer>> GetCharacterAnswers(int characterId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@characterId", characterId);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                List<Answer> answers = (await connection.QueryAsync<Answer>("[dbo].[GetCharacterAnswers]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).ToList();
                return answers;
            }
        }

        public async Task<List<Answer>> GetQuestionAnswers(int questionId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@questionId", questionId);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                List<Answer> answers = (await connection.QueryAsync<Answer>("[dbo].[GetQuestionAnswers]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).ToList();
                return answers;
            }
        }
    }
}
