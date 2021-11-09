module.exports = function (creep) {
    if (creep.memory.targetForDownload) {
        let target = Game.getObjectById(creep.memory.targetForDownload.id);
        
        if (target) {
            if (creep.pickup(target) == OK) {
                creep.memory.order = 'upload';
                return true;
            } else if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
                return true;
            } else {
                return false;
            }
        } else {
            creep.memory.targetForDownload = false;
            return false;
        }
    } else {
        creep.memory.order = false;
        return false;
    }
};