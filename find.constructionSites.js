module.exports = function (creep) {
    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    
    if (targets.length > 0) {
        creep.memory.targetForBuilding = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};