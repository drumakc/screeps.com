module.exports = function (creep, structureType) {
    let targets = Game.rooms[creep.room.name].find(FIND_MY_STRUCTURES, {
        filter: (obj) => {
            return obj.structureType == structureType && obj.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    });
    
    if (targets.length > 0) {
        creep.memory.targetForUpload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
}