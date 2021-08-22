const findEmptyStructure = require('find.emptyStructure');
const findSourcesActive = require('find.sourcesActive');

module.exports = function (creep) {
    if (creep.memory.targetForDownload) {
        let target = Game.getObjectById(creep.memory.targetForDownload.id);
        
        if (target.energy > 0) {
            if (creep.store.getFreeCapacity() > 0) {
                if (creep.harvest(target) == OK) {
                    creep.say(creep.store[RESOURCE_ENERGY]);
                    return true;
                } else if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    return true;
                } else if (creep.harvest() == ERR_NOT_ENOUGH_RESOURCES) {
                    delete creep.memory.targetForDownload;
                    return false;
                } else {
                    return false;
                }
            } else {
                creep.memory.order = 'upload';
            }
        } else {
            delete creep.memory.targetForDownload;
        }
    } else {
        delete creep.memory.targetForDownload;
        creep.memory.order = 'download';
        return false;
    }
    
    
    
        /*if (creep.harvest(creep.memory.targetForDownload) == OK) {
            if (creep.store.getFreeCapacity() == 0) {
                findEmptyStructure(creep, STRUCTURE_CONTAINER)
                creep.say('h↑');
                creep.memory.order = 'upload';
            } else {
                creep.say(creep.store.getUsedCapacity());
            }
            return true;
        } else if (creep.harvest(creep.memory.targetForDownload) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.memory.targetForDownload);
            return true;
        } else if (creep.harvest(creep.memory.targetForDownload) == ERR_NOT_ENOUGH_RESOURCES) {
            findSourcesActive(creep);
            return false;
        } else {
            creep.say(creep.harvest(creep.memory.targetForDownload));
            return false;
        }*/
}