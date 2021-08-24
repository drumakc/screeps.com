const ctrlSpawningC = require('ctrl.spawning.c');
const ctrlSpawningE = require('ctrl.spawning.e');
const ctrlSpawningM = require('ctrl.spawning.m');
const roomNeedMiner = require('room.needMiner');


module.exports = function() {
    for (let roomName in Game.rooms) { 
        //Spawn harvester-builder-upgrader. Creep manage energy.
        if (Game.rooms[roomName].find(FIND_MY_CREEPS).length < 16) {
            let energyInSources = 0;
            let energyCanHarvested = 0;
    
            let harvesters = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (obj) => {return obj.memory.role == 'harvester'}});
    
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
            if (roomNeedMiner(roomName)) {
                ctrlSpawningM(roomName);
            }
        }
        
        //Spawn courier. Creep pickup dropped resources, take resources from tombstones, delivery energy to structures,
        //manage mineral in labs, terminal, storage, facility.
        if (Game.rooms[roomName].controller.level > 3) {
            let couriers = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (obj) => {
                return obj.memory.role == 'courier'
            }});
            
            if (couriers.length == 0) {
                ctrlSpawningC(roomName);
            }
        }
    }
}