module.exports = function (roomName) {
    let swn = Game.spawns[roomName + '_e'];
    let creepName = 'c' + roomName + Game.time;
    let creepBody;
    let creepMemory = {memory: {role: 'courier'}};

    if (swn) {
        if (swn.spawning) {

        } else {
            if (Game.rooms[roomName].energyAvailable > 499) {
                creepBody = [CARRY, CARRY, MOVE];
            } else {
                creepBody = [CARRY, MOVE];
            }
            
            swn.spawnCreep(creepBody, creepName, creepMemory);
        }
    }
};