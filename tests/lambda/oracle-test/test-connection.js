'use strict';
var path = require('path');
const chai = require('chai');
const expect = chai.expect;

process.env.DB_USER  = "";
process.env.DB_PASSWORD  = "";
process.env.DB_CONNECTION_STRING  = "";

describe('Test Success', function ()
{
    it('Test Connect', async function()
    {
        this.timeout(300*1000);

        let event = { };
        let app = require('../../../src/lambda/oracle-test/app.js');
        let result = await app.handler(event, null);

        expect(result).to.be.a("string");
    });
});
