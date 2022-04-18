const {development} = require("../knexfile");
const knex = require("knex")(development);
exports.dbSelect = function(req, res) {

    const playerNum = req.body.userId;
    const winsSelect = knex('games').count('*').where('player_one_id', playerNum).andWhere('result', '1').orWhere((builder) => {
        builder.where('player_two_id', playerNum).andWhere('result', '2')
    });
    const lossesSelect = knex('games').count('*').where('player_one_id', playerNum).andWhere('result', '2').orWhere((builder) => {
        builder.where('player_two_id', playerNum).andWhere('result', '1')
    });
    const drawsSelect = knex('games').count('*').where((builder) => {
        builder.where('player_one_id', playerNum).orWhere('player_two_id', playerNum)
    }).andWhere('result', '0');
    const notFinishedsSelect = knex('games').count('*').where((builder) => {
        builder.where('player_one_id', playerNum).orWhere('player_two_id', playerNum)
    }).andWhere('result', '3');


    knex('users')
        .select({
            name: 'users.name',
       //     gameId: 'games.id',
            wins: knex.raw(`(${winsSelect})`),
            losses: knex.raw(`(${lossesSelect})`),
            draws: knex.raw(`(${drawsSelect})`),
            not_finished: knex.raw(`(${notFinishedsSelect})`)
            //playerOne: 'winner.name',
            //playerTwo: 'loser.name',
            //result: 'games.result',
        }).where('id', playerNum)
        //.leftJoin({winner: 'users'}, 'games.player_one_id', 'winner.id')
        //.leftJoin({loser: 'users'}, 'games.player_two_id', 'loser.id')
        .then((users) => {
            return res.json(users);
        })
        .catch((err) => {
            console.error(err);
            return res.json({success: false, message: 'An error occurred, please try again later.'});
        })
};