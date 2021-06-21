var ctrlSpawningE = require('ctrl.spawning.e');


module.exports = function() {
    for (let roomName in Game.rooms) {        
        let energyInSources = 0;
        let energyCanHarvested = 0;

        let harvesters = Game.rooms[roomName].find(FIND_MY_CREEPS, {filter: (obj) => {return obj.memory.role = 'harvester'}});

        if (harvesters.length > 0) {

            for (let i in Memory.rooms[roomName].sources) {
                energyInSources += Game.getObjectById(Memory.rooms[roomName].sources[i].id).energy;
            }
            
            for (let i in harvesters) {
                energyCanHarvested += harvesters[i].getActiveBodyparts(WORK) * 2 * 300;
            }
            
            if (energyInSources > energyCanHarvested) {
                ctrlSpawningE(roomName);
            }
        } else {
            ctrlSpawningE(roomName);
        }
    }
}