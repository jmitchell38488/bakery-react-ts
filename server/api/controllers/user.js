const
    Util = require('../../util');

const Users = [
    {id: 1, name: 'Foo'},
    {id: 2, name: 'Bar'}
];

Object.freeze(Users);

class UserController {

    constructor() {
        //
    }

    all() {
        return Users;
    }

    find(params) {
        if (!(!!params) || (Util.isArray(params) && params.length < 1)) {
            return Users;
        }

        // Do some sort of search based on predicate
    }

    findOne(userId) {
        let uid = parseInt(userId);
        return Users.find(user => user.id === uid);
    }

}

module.exports = UserController;