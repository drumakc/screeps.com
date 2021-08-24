module.exports = function (creep) {
    let targets = creep.room.find(FIND_TOMBSTONES, {filter: (obj) => {return obj.store.getUsedCapacity() > 0}});
    
    if (targets.length > 0) {
        let target = creep.pos.findClosestByPath(targets);
        
        creep.memory.targetForDownload = target;
        return true;
    } else {
        return false;
    }
};