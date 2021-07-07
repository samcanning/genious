using System.ComponentModel.DataAnnotations;

namespace Genious.Models
{
    public enum AnswerValue
    {
        Yes = 1,
        No = 2,
        [Display(Name = "Don't Know")]
        DontKnow = 3,
        Probably = 4,
        [Display(Name = "Probably Not")]
        ProbablyNot = 5
    }
}
