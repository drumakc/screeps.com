module.exports = function (creep) {
    let targets = creep.pos.findInRange(FIND_MY_STRUCTURES, 3, {
        filter: (obj) => {
            return obj.structureType == STRUCTURE_TOWER && obj.store.getFreeCapacity(RESOURCE_ENERGY) > 500
        }
    });
    
    if (targets.length > 0) {
        creep.memory.targetForUpload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
}