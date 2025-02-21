import sql from "mssql";
import { User, UserDto } from "../models/user.model";
import { database } from "../config/database";

export class UserRepository {
  async findAll(keyword?: string, orderBy?: string, sort?: string) {
    var query = "SELECT * FROM Users";

    // Only add WHERE clause if keyword is provided
    if (keyword) {
      query += `
          WHERE name LIKE @keyword 
          OR email LIKE @keyword
        `;
    }

    query += ` ORDER BY ${orderBy || "created_at"} ${sort || "DESC"}`;

    const pool = await database.connect();
    const result = await pool
      .request()
      .input("keyword", sql.NVarChar, "%${keyword}%")
      .query(query);
    return result.recordset;
  }

  async findById(id: number): Promise<User | null> {
    const pool = await database.connect();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE id = @id");
    return result.recordset[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const pool = await database.connect();

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM Users WHERE email = @email");

    return result.recordset[0] || null;
  }

  async create(user: UserDto): Promise<number> {
    const pool = await database.connect();
    const result = await pool
      .request()
      .input("name", sql.NVarChar, user.name)
      .input("email", sql.NVarChar, user.email)
      .query(
        "INSERT INTO Users (name, email) OUTPUT INSERTED.id VALUES (@name, @email)"
      );

    return result.recordset[0].id;
  }

  async update(id: number, user: Partial<UserDto>): Promise<boolean> {
    const pool = await database.connect();
    const request = pool.request().input("id", sql.Int, id);

    let updateQuery = "UPDATE Users SET ";
    const updates: string[] = [];

    if (user.name !== undefined) {
      request.input("name", sql.NVarChar, user.name);
      updates.push("name = @name");
    }
    if (user.email !== undefined) {
      request.input("email", sql.NVarChar, user.email);
      updates.push("email = @email");
    }

    updateQuery += updates.join(", ") + " WHERE id = @id";
    const result = await request.query(updateQuery);
    return result.rowsAffected[0] > 0;
  }

  async delete(id: number): Promise<boolean> {
    const pool = await database.connect();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE id = @id");
    return result.rowsAffected[0] > 0;
  }
}
