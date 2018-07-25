let config = {};

config.application = {};
config.application.host = 'localhost';
config.application.maxItemsPerPage = 100;

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

module.exports = config;