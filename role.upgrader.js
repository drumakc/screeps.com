const findSourcesActive = require('find.sourcesActive');
const orderHarvestEnergy = require('order.harvestEnergy');

module.exports = function (creep) {creep.say('u');
    if (creep.memory.order) {
        switch (creep.memory.order) {
            case 'download':
                if (creep.store.getFreeCapacity() > 0) {
                    creep.memory.role = 'harvester';
                } else {
                    creep.memory.order = 'upload';
                }
                break;
            case 'upload':
                if (creep.store[RESOURCE_ENERGY] > 0) {
                    if (creep.upgradeController(creep.room.controller) == OK) {
                        
                    } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    } else  if (creep.upgradeController(creep.room.controller) == ERR_NOT_ENOUGH_RESOURCES) {
                        creep.say('u↓');
                        creep.memory.order = 'download';
                    } else {
                        creep.say('u err=' + creep.upgradeController(creep.room.controller));
                    }
                } else {
                    creep.say('u↓');
                    creep.memory.order = 'download';
                }
                break;
            default:
                if (creep.store[RESOURCE_ENERGY] == 0) {
                    creep.say('u↓');
                } else {
                    creep.say('u↑');
                }
                break;
        }
    } else {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.say('u↓');
            creep.memory.order = 'download';
        } else {
            creep.say('u↑');
            creep.memory.order = 'upload';
        }
    }
};