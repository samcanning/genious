CREATE PROCEDURE [dbo].[GetCharacterAnswers]
	@characterId int
AS
	SELECT * FROM [dbo].[Answers]
	WHERE [CharacterId] = @characterId
RETURN