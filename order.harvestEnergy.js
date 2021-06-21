module.exports = function (creep) {
    if (creep.harvest(creep.memory.targetForDownload) == OK) {
        if (creep.store.getFreeCapacity() == 0) {
            creep.say('h↑');
            creep.memory.order = 'upload';
        } else {
            creep.say(creep.store.getUsedCapacity());
        }
        return true;
    } else if (creep.harvest(creep.memory.targetForDownload) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.memory.targetForDownload);
        return true;
    } else {
        creep.say(creep.harvest(creep.memory.targetForDownload));
        return false;
    }
}