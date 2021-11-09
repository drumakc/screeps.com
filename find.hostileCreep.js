module.exports = function (creep) {
    let targets = creep.room.find(FIND_HOSTILE_CREEPS);
        
    if (targets.length > 0) {
        creep.memory.target = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
};