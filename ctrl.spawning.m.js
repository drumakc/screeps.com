module.exports = function (roomName) {
    let swn = Game.spawns[roomName + '_m'];
    let creepName = 'm' + roomName + Game.time;
    let creepBody;
    let creepMemory = {memory: {role: 'miner'}};

    if (swn) {
        if (swn.spawning) {

        } else {
            if (Game.rooms[roomName].energyAvailable > 3649) {
                creepBody = [
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                    WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            } else if (Game.rooms[roomName].energyAvailable > 1799) {
                creepBody = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
            } else {
                creepBody = [WORK, CARRY, MOVE];
            }
            
            swn.spawnCreep(creepBody, creepName, creepMemory);
        }
    }
};