module.exports = function (creep) {
    let targets = creep.pos.findInRange(FIND_MY_STRUCTURES, 3, {filter:
        (obj) => {
            return obj.structureType == STRUCTURE_LINK && obj.energy > 0
        }
    });
    
    creep.say(targets.length);
    if (targets.length > 0) {
        creep.memory.targetForDownload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};