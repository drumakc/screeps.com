module.exports = function(creep) {
    let targets = creep.room.find(FIND_SOURCES_ACTIVE);

    if (targets.length > 0) {
        creep.memory.targetForDownload = creep.pos.findClosestByPath(targets);
        return true;
    } else {
        return false;
    }
}