const { Response } = require('./response.js')
const { hashFunction } = require('./hash.js')

const knex = require("knex");
const knexConfig = require("../knexfile"); // Knex Database Configuration
const db = knex(knexConfig.development);

global.db = db
global.Response = Response
global.hashFunction = hashFunction
global.log = console.log


// services
let { MailService } = require('../services/email')
global.MailService = MailService


//emmitters
const emailEmitter = require('../events/notification.js');

global.Events = { emailEmitter };
