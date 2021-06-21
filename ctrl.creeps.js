const roleBuilder = require('role.builder');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports = function() {
    for (let creepName in Memory.creeps) {
        if (Game.creeps[creepName]) {
            switch (Game.creeps[creepName].memory.role) {
                case 'builder':
                    roleBuilder(Game.creeps[creepName]);
                    break;
                case 'harvester':
                    roleHarvester(Game.creeps[creepName]);
                    break;
                case 'upgrader':
                    roleUpgrader(Game.creeps[creepName]);
                    break;
                default:
                    if (creep.getActiveBodyparts(WORK) > 0) {
                        creep.memory.role = 'harvester';
                    } else {
                        creep.say('role=' + creep.memory.role);
                    }
                    break;
            }
        } else {
            delete Memory.creeps[creepName];
        }
    }
}