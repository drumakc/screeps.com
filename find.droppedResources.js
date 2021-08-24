module.exports = function (creep) {
    let targets = creep.room.find(FIND_DROPPED_RESOURCES);
    
    if (targets.length > 0) {
        creep.memory.targetForDownload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};