namespace Genious.Models
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public int QuestionId { get; set; }
        public int CharacterId { get; set; }
        public AnswerValue Value { get; set; }
    }
}
