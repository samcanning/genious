CREATE PROCEDURE [dbo].[GetCharactersByAnswers]
	@questionId int,
	@value int
AS
	SELECT [dbo].[Characters].[Name], [dbo].[Questions].[Text], [dbo].[Answers].[Value]
	FROM [dbo].[Answers]
	INNER JOIN [dbo].[Characters] ON [dbo].[Answers].[CharacterId] = [dbo].[Characters].[CharacterId]
	INNER JOIN [dbo].[Questions] ON [dbo].[Answers].[QuestionId] = [dbo].[Questions].[QuestionId]
	WHERE [dbo].[Questions].[QuestionId] = @questionId AND [dbo].[Answers].[Value] = @value
RETURN