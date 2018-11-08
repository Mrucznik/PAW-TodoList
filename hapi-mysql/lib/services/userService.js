'use strict';

const Util = require('util');
const SecurePassword = require('secure-password');
const Schmervice = require('schmervice');
const JWT = require('jsonwebtoken');

module.exports = class UserService extends Schmervice.Service {

    constructor(...args) {

        super(...args);

        const pwd = new SecurePassword();

        this.pwd = {
            hash: Util.promisify(pwd.hash.bind(pwd)),
            verify: Util.promisify(pwd.verify.bind(pwd))
        };
    }

    async findById(id, txn) {

        const { Users } = this.server.models();

        return await Users.query(txn).throwIfNotFound().findById(id);
    }

    async findByUsername(username, txn) {

        const { Users } = this.server.models();

        return await Users.query(txn).throwIfNotFound().first().where({ username });
    }

    async update(id, { password, ...userInfo }, txn) {

        const { Users } = this.server.models();

        if (Object.keys(userInfo).length > 0) {
            await Users.query(txn).throwIfNotFound().where({ id }).patch(userInfo);
        }

        if (password) {
            await this.changePassword(id, password, txn);
        }

        return id;
    }

    async signup({ password, ...userInfo }, txn) {

        const { Users } = this.server.models();

        const { id } = await Users.query(txn).insert(userInfo);

        await this.changePassword(id, password, txn);

        return id;
    }

    async login({ name, password }, txn) {

        const { Users } = this.server.models();

        const user = await Users.query(txn).throwIfNotFound().first().where({
            name
        });

        const result = await this.pwd.verify(Buffer.from(password), user.password);

        if (result === SecurePassword.VALID_NEEDS_REHASH) {
            await this.changePassword(user.id, password, txn);
        }
        else if (result !== SecurePassword.VALID) {
            throw Users.createNotFoundError();
        }

        return user;
    }

    async createToken(id) {

        return await JWT.sign({ id }, this.options.jwtKey, {
            algorithm: 'HS256',
            expiresIn: '7d'
        });
    }

    async changePassword(id, password, txn) {

        const { Users } = this.server.models();

        await Users.query(txn).throwIfNotFound().where({ id }).patch({
            password: await this.pwd.hash(Buffer.from(password))
        });

        return id;
    }
};