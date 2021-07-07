CREATE TABLE [dbo].[Answers]
(
	[AnswerId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [QuestionId] INT NOT NULL, 
    [CharacterId] INT NOT NULL, 
    [Value] INT NOT NULL, 
    CONSTRAINT [FK_Answers_Questions] FOREIGN KEY ([QuestionId]) REFERENCES [Questions]([QuestionId]),
	CONSTRAINT [FK_Answers_Characters] FOREIGN KEY ([CharacterId]) REFERENCES [Characters]([CharacterId])
)
