/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('games').del()
    await knex('games').insert([
        {player_one_id: '1', player_two_id: '3', result: '0',},
        {player_one_id: '1', player_two_id: '2', result: '1',},
        {player_one_id: '3', player_two_id: '4', result: '2',},
        {player_one_id: '5', player_two_id: '1', result: '3',},
        {player_one_id: '2', player_two_id: '4', result: '3',},
        {player_one_id: '1', player_two_id: '3', result: '3',},
        {player_one_id: '1', player_two_id: '2', result: '2',},
        {player_one_id: '3', player_two_id: '4', result: '2',},
        {player_one_id: '5', player_two_id: '1', result: '1',},
        {player_one_id: '2', player_two_id: '4', result: '0',},
        {player_one_id: '1', player_two_id: '3', result: '0',},
        {player_one_id: '1', player_two_id: '2', result: '1',},
        {player_one_id: '3', player_two_id: '4', result: '1',},
        {player_one_id: '5', player_two_id: '1', result: '2',},
        {player_one_id: '2', player_two_id: '4', result: '2',},
        {player_one_id: '1', player_two_id: '3', result: '2',},
        {player_one_id: '1', player_two_id: '2', result: '3',},
        {player_one_id: '3', player_two_id: '4', result: '2',},
        {player_one_id: '5', player_two_id: '1', result: '1',},
    ]);
};
