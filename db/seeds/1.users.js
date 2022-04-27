/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('users').truncate()
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    {login: 'imzod', name: 'Andrey'},
    {login: 'sadlues', name: 'Ruslan'},
    {login: 'flure', name: 'Alexandr'},
    {login: 'niknik', name: 'Nikita'},
    {login: 'qwe3', name: 'lolka'},
  ]);
};
