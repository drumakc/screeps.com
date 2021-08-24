module.exports = function (creep, resourceType) {
    if (creep.store.getFreeCapacity() == 0) {
        delete creep.memory.targetForDownload;
        creep.memory.order = 'upload';
        return false;
    } else {
        if (creep.memory.targetForDownload) {
            let target = Game.getObjectById(creep.memory.targetForDownload.id);
            
            if (target) {
                if (resourceType) {
                    if (creep.withdraw(target, resourceType) == OK) {
                        creep.memory.targetForDownload = false;
                        creep.memory.order = 'upload';
                        creep.say('h↑');
                        return true;
                    } else if (creep.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    for (let resourceType in target.store) {
                        if (creep.withdraw(target, resourceType) == OK) {
                            return true;
                        } else if (creep.withdraw(target, resourceType) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
};