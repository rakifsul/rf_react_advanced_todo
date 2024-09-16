/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("todos", function (table) {
            table.increments("_id");
            table.string("title", 1000).notNullable();
            table.text("description", "text").notNullable();
            table.timestamps(true, true, true);
        })
        .createTable("users", function (table) {
            table.increments("_id");
            table.string("email", 1000).notNullable();
            table.string("password", 1000).notNullable();
            table.string("refreshToken", 2000);
            table.timestamps(true, true, true);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users").dropTable("todos");
};
