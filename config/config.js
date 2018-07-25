var package = require('../package.json');
let config = {};

config.application = {};
config.application.domain = 'localhost';
config.application.name = package.name;
config.application.port = 3000;
config.application.maxItemsPerPage = 100;
config.application.timeZone = 'America/Bogota';
config.application.locale = 'es';
config.application.host = `http://${config.application.domain}:${config.application.port}`;
config.application.version = package.version;

config.database = {};
config.database.dialect = "mysql";
config.database.username = "root";
config.database.password = "CwqSolu9pZMorHuz";
config.database.port = "3306";
config.database.host = "phenixbytes.com";
config.database.database = "socialapp";
config.database.operatorsAliases = false;

config.database.pool = {};
config.database.pool.max = 5;
config.database.pool.min = 0;
config.database.pool.acquire = 30000;
config.database.pool.idle = 10000;

config.sequelize = {};
config.sequelize.sync = {};
config.sequelize.sync.force = false;
config.sequelize.sync.logging = null;

config.crypto = {};
config.crypto.salt = "o8ynw4v5opym5pq98y oq w6 j{w5{6´j w{56o,jw4pi6mjr46w59phu69q4n5hñq45hñq3";

config.uploads = {};
config.uploads.defaultTmpUpload = 'uploads';
config.uploads.defaultPrivateFolder = 'public/files/private';
config.uploads.defaultPrivateUpload = `${config.uploads.defaultPrivateFolder}/tmp/`;
config.uploads.filenameLength = 32;

config.mail = {};
config.mail.user = '';
config.mail.password = '';

config.validate = {};
config.validate.thumbnailUrl = /^\/private(\/(\d+)x(\d+))?\/(.*)+\/?$/;
/**
 * Session config
 * */
config.session = {};
config.session.secret = config.crypto.salt;
config.session.maxAge = 60 * 5;
config.session.resave = false;
config.session.saveUninitialized = false;
//Note be careful when setting this to true, as compliant clients will not send
//the cookie back to the server in the future if the browser does not have
//an HTTPS connection.
//
//      https://github.com/expressjs/session
config.session.cookie = { secure: true };
config.session.name = `${config.application.name}' - REST-API SID`;
config.session.tokenLenght = 64;
config.session.expire = 60 * 60 * 1000 * 2;

module.exports = config;