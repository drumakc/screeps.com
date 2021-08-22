const findSourcesActive = require('find.sourcesActive');
const orderHarvestEnergy = require('order.harvestEnergy');

module.exports = function (creep) {
    let sources = creep.pos.findInRange(FIND_SOURCES_ACTIVE, 3);
        
    if (sources.length > 0) {
        let targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
            filter: (obj) => {
                return obj.structureType == STRUCTURE_CONTAINER && obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        });
                
        if (targets.length > 0) {
            creep.memory.targetForUpload = creep.pos.findClosestByPath(targets);
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}