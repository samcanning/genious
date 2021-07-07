CREATE TABLE [dbo].[Characters]
(
	[CharacterId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Source] NVARCHAR(512) NOT NULL, 
    [ImageLink] NVARCHAR(512) NULL
)