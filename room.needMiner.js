module.exports = function (roomName) {
    let extractors = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (obj) => {
        return obj.structureType == STRUCTURE_EXTRACTOR
    }});
                
    if (extractors.length > 0) {
        if (Game.rooms[roomName].storage.store.getFreeCapacity() > 0 || Game.rooms[roomName].terminal.store.getFreeCapacity() > 0) {
            let mineral = Game.getObjectById(Memory.rooms[roomName].mineral.id);
                        
            if (mineral.mineralAmount > 0) {
                let miners = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (obj) => {
                    return obj.memory.role == 'miner'
                }});
                            
                if (miners.length < 1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}