const roleBuilder = require('role.builder');
const roleColonizator = require('role.colonizator');
const roleCourier = require('role.courier');
const roleDefender = require('role.defender');
const roleHarvester = require('role.harvester');
const roleMiner = require('role.miner');
const roleUpgrader = require('role.upgrader');
const roleSlave = require('role.slave');

module.exports = function() {
    for (let i in Game.creeps) {
        if (!Memory.creeps[i]) {
            Memory.creeps[i] = Game.creeps[i];
        }
    }
    for (let creepName in Memory.creeps) {
        if (Game.creeps[creepName]) {
            switch (Game.creeps[creepName].memory.role) {
                case 'builder':
                    roleBuilder(Game.creeps[creepName]);
                    break;
                case 'colonizator': 
                    roleColonizator(Game.creeps[creepName]);
                    break;
                case 'courier':
                    roleCourier(Game.creeps[creepName]);
                    break;
                case 'defender':
                    roleDefender(Game.creeps[creepName]);
                    break;
                case 'harvester':
                    roleHarvester(Game.creeps[creepName]);
                    break;
                case 'miner':
                    roleMiner(Game.creeps[creepName]);
                    break;
                case 'upgrader':
                    roleUpgrader(Game.creeps[creepName]);
                    break;
                case 'slave':
                    roleSlave(Game.creeps[creepName]);
                    break;
                default:
                    Game.creeps[creepName].memory.role = 'colonizator';
                    roleColonizator(Game.creeps[creepName]);
                    break;
            }
        } else {
            delete Memory.creeps[creepName];
        }
    }
}