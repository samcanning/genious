CREATE PROCEDURE [dbo].[CreateQuestion]
	@text nvarchar(512)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[Questions]
	([Text])
	VALUES (@text)
	SELECT SCOPE_IDENTITY()
END
RETURN