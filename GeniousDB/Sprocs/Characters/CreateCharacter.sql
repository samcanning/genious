CREATE PROCEDURE [dbo].[CreateCharacter]
	@name nvarchar(50),
	@source nvarchar(512),
	@imageLink nvarchar(512)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[Characters]
	([Name], [Source], [ImageLink])
	VALUES (@name, @source, @imageLink)
	SELECT SCOPE_IDENTITY()
END
RETURN