module.exports = function (creep) {
    let targets = creep.pos.findInRange(FIND_STRUCTURES, 3, {filter: 
        (obj) => {return obj.structureType == STRUCTURE_LINK && obj.store[RESOURCE_ENERGY] < 800}
    });
    
    if (targets.length > 0) {
        creep.memory.targetForUpload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};