using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Genious.Models;
using Genious.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Genious.Controllers
{
    public class GameController : Controller
    {
        public readonly AppSettings Settings;

        public GameController(IOptions<AppSettings> options)
        {
            Settings = options.Value;
        }

        [HttpPost]
        public async Task<JsonResult> NewQuestion([FromBody] NewQuestionModel model)
        {
            List<Question> allQuestions = await new QuestionService(Settings.SqlConnectionString).GetQuestions();

            List<Question> newQuestions = allQuestions.Where(q => !model.AskedQuestionIds.Contains(q.QuestionId)).ToList();

            if (model.PossibleCharacters.Count == 0)
            {
                model.PossibleCharacters = await new CharacterService(Settings.SqlConnectionString).GetAllCharacters();
            }

            Question selectedQuestion = await new QuestionService(Settings.SqlConnectionString).GetBestQuestion(newQuestions, model.PossibleCharacters);

            if (selectedQuestion == null)
            {
                return new JsonResult(null);
            }

            return new JsonResult(selectedQuestion);
        }

        [HttpPost]
        public async Task<JsonResult> SubmitAnswer([FromBody] List<Answer> answers)
        {
            List<Character> characters = await new CharacterService(Settings.SqlConnectionString).GetCharactersByAnswers(answers);

            return new JsonResult(characters);
        }

        [HttpPost]
        public async Task<JsonResult> FinalizeResults([FromBody] FinalizeResultsModel model)
        {
            var answerService = new AnswerService(Settings.SqlConnectionString);

            if (model.NewCharacter)
            {
                int i = await new CharacterService(Settings.SqlConnectionString).CreateCharacter(model.Character.Name, model.Character.Source);

                foreach (Answer a in model.Answers)
                {
                    await answerService.CreateAnswer(a.QuestionId, i, a.Value);
                }
            }
            else
            {
                List<Answer> existingAnswers = await answerService.GetCharacterAnswers(model.Character.CharacterId);
                model.Character = await new CharacterService(Settings.SqlConnectionString).GetCharacter(model.Character.CharacterId);

                foreach (Answer a in model.Answers)
                {
                    if (!existingAnswers.Any(ea => ea.QuestionId == a.QuestionId))
                    {
                        await answerService.CreateAnswer(a.QuestionId, model.Character.CharacterId, a.Value);
                    }
                }
            }

            return new JsonResult(model.Character);
        }

        [HttpPost]
        public async Task<JsonResult> SearchCharacter([FromBody] string name)
        {
            List<Character> possibleCharacters = new List<Character>();
            var service = new CharacterService(Settings.SqlConnectionString);

            foreach (string s in name.Split(' ', StringSplitOptions.RemoveEmptyEntries))
            {
                List<Character> matches = await service.GetCharactersByName(s);
                possibleCharacters.AddRange(matches);
            }

            return new JsonResult(possibleCharacters);
        }
    }

    public class NewQuestionModel
    {
        public int[] AskedQuestionIds { get; set; }
        public List<Character> PossibleCharacters { get; set; }
    }

    public class FinalizeResultsModel
    {
        public List<Answer> Answers { get; set; }
        public Character Character { get; set; }
        public bool NewCharacter { get; set; }
    }
}