CREATE PROCEDURE [dbo].[GetCharactersByName]
	@name nvarchar(50)
AS
	SELECT * FROM [dbo].[Characters]
	WHERE [Name] LIKE CONCAT('%', @name, '%')
RETURN