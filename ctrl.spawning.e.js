

module.exports = function(roomName) {
    let swn = Game.spawns[roomName + '_e'];
    let creepName = 'e' + Game.time;
    let creepBody;
    let creepMemory = {memory: {role: 'harvester'}};

    if (swn) {
        if (swn.spawning) {

        } else {
            if (Game.rooms[roomName].energyAvailble > 3649) {
                console.log('ctrl.spawning.e => energy availble > 3500');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
            } else if (Game.rooms[roomName].energyAvailble > 2099) {
                console.log('ctrl.spawning.e => energy availble > 2100');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (Game.rooms[roomName].energyAvailble > 1799) {
                console.log('ctrl.spawning.e => energy availble > 1800');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE 
                ];
            } else if (Game.rooms[roomName].energyAvailble > 999) {
                console.log('ctrl.spawning.e => energy availble > 1000');
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE
                ];
            } else if (Game.rooms[roomName].energyAvailble > 699) {
                console.log('ctrl.spawning.e => energy availble > 700');
                creepBody = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
            } else if (Game.rooms[roomName].energyAvailble > 499) {
                console.log('ctrl.spawning.e => energy availble > 500');
                creepBody = [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                console.log('ctrl.spawning.e => energy availble > 200');
                creepBody = [WORK, CARRY, MOVE];
            }

            swn.spawnCreep(creepBody, creepName, creepMemory);
        }
    }
    
}