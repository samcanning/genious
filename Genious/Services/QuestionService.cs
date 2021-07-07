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

        public async Task<int> CreateQuestion(string text)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@text", text);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                int i = (await connection.QueryAsync<int>("[dbo].[CreateQuestion]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();
                return i;
            }
        }

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

        public async Task<Question> GetBestQuestion(List<Question> possibleQuestions, List<Character> possibleCharacters)
        {
            var answerService = new AnswerService(SqlConnectionString);
            int max = -1;
            int id = -1;

            foreach (Question q in possibleQuestions)
            {
                List<Answer> questionAnswers = await answerService.GetQuestionAnswers(q.QuestionId);
                int totalNotNo = 0;

                foreach (Character c in possibleCharacters)
                {
                    Answer a = questionAnswers.SingleOrDefault(qa => qa.CharacterId == c.CharacterId);

                    //if an answer does not yet exist for this character, or a "yes"/"probably" answer exists for this character, add to the running total
                    if (a == null || (a != null && (a.Value == AnswerValue.Yes || a.Value == AnswerValue.Probably)))
                    {
                        totalNotNo++;
                    }
                }

                if (totalNotNo > max)
                {
                    max = totalNotNo;
                    id = q.QuestionId;
                }
            }

            //the question with the most possible not-no answers is the most worth asking
            Question bestQuestion = possibleQuestions.SingleOrDefault(q => q.QuestionId == id);

            if (bestQuestion == null)
            {
                bestQuestion = possibleQuestions[new System.Random().Next(possibleQuestions.Count)];
            }

            return bestQuestion;
        }
    }
}
