CREATE DATABASE crude_server;
GO

USE crude_server;
GO

CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Insert some sample data
INSERT INTO Users (name, email) VALUES 
    (N'John Doe', 'john@example.com'),
    (N'Jane Smith', 'jane@example.com');
GO