CREATE PROCEDURE [dbo].[GetCharacterAnswersWithJoins]
	@characterId int
AS
	SELECT [dbo].[Characters].[Name], [dbo].[Questions].[Text], [dbo].[Answers].[Value]
	FROM [dbo].[Answers]
	INNER JOIN [dbo].[Characters] ON [dbo].[Answers].[CharacterId] = [dbo].[Characters].[CharacterId]
	INNER JOIN [dbo].[Questions] ON [dbo].[Answers].[QuestionId] = [dbo].[Questions].[QuestionId]
	WHERE [dbo].[Answers].[CharacterId] = @characterId
RETURN