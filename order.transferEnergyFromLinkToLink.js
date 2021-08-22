module.exports = function (creep) {
    let targets = creep.room.find(FIND_MY_STRUCTURES, {filter: 
        (obj) => {return obj.structureType == STRUCTURE_LINK && obj.store[RESOURCE_ENERGY] > 0}
    });
    
    if (targets.length > 0) {
        let linkA = targets[0];
        let linkB = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, 3, {filter:
            (obj) => {return obj.structureType == STRUCTURE_LINK}
        });
        
        linkA.transferEnergy(linkB);
        return true;
    } else {
        return false;
    }
};