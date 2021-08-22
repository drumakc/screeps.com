module.exports = function (creep, resourceType) {
    if (creep.store.getUsedCapacity() > 0) {
        if (creep.memory.targetForUpload) {
            let target = Game.getObjectById(creep.memory.targetForUpload.id);
            
            if (target) {
                if (target.store.getFreeCapacity(resourceType) > 0) {
                    if (creep.transfer(target, resourceType) == OK) {
                        delete creep.memory.targetForUpload;
                        return true;
                    } else if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        return true;
                    } else {
                        creep.say('err ' + creep.transfer(target, resourceType));
                        return false;
                    }
                } else {
                    delete creep.memory.targetForUpload;
                    return false;
                }
            } else {
                delete creep.memory.targetForUpload;
                return false;
            }
        } else {
            return false;
        }
    } else {
        creep.memory.order == false;
        return false;
    }
}