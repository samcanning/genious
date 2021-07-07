using System.Threading.Tasks;
using Genious.Models;
using Genious.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Genious.Controllers
{
    public class DataController : Controller
    {
        public readonly AppSettings Settings;

        public DataController(IOptions<AppSettings> options)
        {
            Settings = options.Value;
        }

        [Route("/game/getquestion")]
        public async Task<JsonResult> GetQuestion()
        {
            var questions = await new QuestionService(Settings.SqlConnectionString).GetQuestions();

            return new JsonResult(questions);
        }
    }
}