CREATE PROCEDURE [dbo].[GetCharacter]
	@characterId int
AS
	SET NOCOUNT ON;
	SELECT *
	FROM [dbo].[Characters]
	WHERE [CharacterId] = @characterId
RETURN