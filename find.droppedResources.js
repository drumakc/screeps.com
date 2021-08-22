module.exports = function (creep) {
    let targets = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10);
    
    if (targets.length > 0) {
        creep.memory.targetForDownload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};