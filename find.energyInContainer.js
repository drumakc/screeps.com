module.exports = function (creep) {
    let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (obj) => {
            return obj.structureType == STRUCTURE_CONTAINER && obj.store[RESOURCE_ENERGY] > 0
        }
    });
    
    if (targets.length > 0) {
        creep.memory.targetForDownload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};