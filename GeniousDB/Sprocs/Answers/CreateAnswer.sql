CREATE PROCEDURE [dbo].[CreateAnswer]
	@questionId int,
	@characterId int,
	@value int
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[Answers]
	([QuestionId], [CharacterId], [Value])
	VALUES (@questionId, @characterId, @value)
	SELECT SCOPE_IDENTITY()
END
RETURN