

module.exports = function(roomName) {
    let swn = Game.spawns[roomName + '_e'];
    let creepName = 'e' + roomName + Game.time;
    let creepBody;
    let creepMemory = {memory: {role: 'harvester'}};

    if (swn) {
        if (swn.spawning) {

        } else {
            if (Game.rooms[roomName].energyAvailable > 3649) {
                //console.log('ctrl.spawning.e => energy available > 3500');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (Game.rooms[roomName].energyAvailable > 2099) {
                //console.log('ctrl.spawning.e => energy available > 2100');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (Game.rooms[roomName].energyAvailable > 1799) {
                //console.log('ctrl.spawning.e => energy available > 1800');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE 
                ];
            } else if (Game.rooms[roomName].energyAvailable > 999) {
                //console.log('ctrl.spawning.e => energy available > 1000');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (Game.rooms[roomName].energyAvailable > 699) {
                //console.log('ctrl.spawning.e => energy available > 700');
                creepBody = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
            } else if (Game.rooms[roomName].energyAvailable > 499) {
                //console.log('ctrl.spawning.e => energy available > 500');
                creepBody = [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
            } else {
                //console.log('ctrl.spawning.e => energy available > 200');
                creepBody = [WORK, CARRY, MOVE];
            }
            
            swn.spawnCreep(creepBody, creepName, creepMemory);
        }
    }
    
}