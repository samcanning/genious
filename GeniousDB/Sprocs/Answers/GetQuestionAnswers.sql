CREATE PROCEDURE [dbo].[GetQuestionAnswers]
	@questionId int
AS
	SELECT * FROM [dbo].[Answers]
	WHERE [QuestionId] = @questionId
RETURN