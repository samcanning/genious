using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Genious.Models;

namespace Genious.Services
{
    public class CharacterService : BaseService
    {
        public CharacterService(string sqlConnectionString) : base(sqlConnectionString) { }

        public async Task<int> CreateCharacter(string name, string source)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@name", name);
            parameters.Add("@source", source);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                int i = (await connection.QueryAsync<int>("[dbo].[CreateCharacter]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();
                return i;
            }
        }

        public async Task<List<Character>> GetAllCharacters()
        {
            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                List<Character> characters = (await connection.QueryAsync<Character>("[dbo].[GetAllCharacters]",
                    commandType: CommandType.StoredProcedure)).ToList();
                return characters;
            }
        }

        public async Task<Character> GetCharacter(int characterId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@characterId", characterId);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                Character character = (await connection.QueryAsync<Character>("[dbo].[GetCharacter]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).FirstOrDefault();
                return character;
            }
        }

        public async Task<List<Character>> GetCharactersByAnswers(List<Answer> answers)
        {
            List<Character> allCharacters;

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                allCharacters = (await connection.QueryAsync<Character>("[dbo].[GetAllCharacters]",
                    commandType: CommandType.StoredProcedure)).ToList();
            }

            List<Character> matches = new List<Character>();
            AnswerService service = new AnswerService(SqlConnectionString);

            foreach (Character c in allCharacters)
            {
                List<Answer> characterAnswers = await service.GetCharacterAnswers(c.CharacterId);
                bool match = true;

                foreach (Answer a in answers)
                {
                    Answer thisAnswer = characterAnswers.SingleOrDefault(ca => ca.QuestionId == a.QuestionId);

                    if (thisAnswer != null) //character has answer for this question
                    {
                        if (thisAnswer.Value != a.Value) //character's answer for this question does not match given answer
                        {
                            match = false;
                            break;
                        }
                    }
                }

                if (match)
                {
                    matches.Add(c);
                }
            }

            return matches;
        }

        public async Task<List<Character>> GetCharactersByName(string name)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@name", name);

            using (SqlConnection connection = new SqlConnection(SqlConnectionString))
            {
                List<Character> characters = (await connection.QueryAsync<Character>("[dbo].[GetCharactersByName]",
                    parameters,
                    commandType: CommandType.StoredProcedure)).ToList();
                return characters;
            }
        }
    }
}
