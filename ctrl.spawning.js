const ctrlSpawningE = require('ctrl.spawning.e');
const ctrlSpawningM = require('ctrl.spawning.m');


module.exports = function() {
    for (let roomName in Game.rooms) { 
        //Spawn harvester-builder-upgrader. Creep manage energy.
        if (Game.rooms[roomName].find(FIND_MY_CREEPS).length < 16) {
            let energyInSources = 0;
            let energyCanHarvested = 0;
    
            let harvesters = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (obj) => {return obj.memory.role = 'harvester'}});
    
            if (harvesters.length > 0) {
    
                for (let i in Memory.rooms[roomName].sources) {
                    energyInSources += Game.getObjectById(Memory.rooms[roomName].sources[i].id).energy;
                }
                
                for (let i in harvesters) {
                    energyCanHarvested += harvesters[i].getActiveBodyparts(WORK) * 100;
                }
                
                if (energyInSources > energyCanHarvested / 2) {
                    ctrlSpawningE(roomName);
                }
            } else {
                ctrlSpawningE(roomName);
            }
        }
        
        //Spawn mineralminer. Creep harvest and manage mineral.
        if (Game.spawns[roomName + '_m']) {
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
                            ctrlSpawningM(roomName);
                        }
                    }
                }
            }
        }
    }
}