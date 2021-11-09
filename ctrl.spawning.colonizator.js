module.exports = function (roomA, roomB) {
    let creepBody;
    if (Memory.rooms[roomB]) {
        if (Game.rooms[roomB]) {
            if (Game.rooms[roomB].controller) {
                if (Game.rooms[roomB].controller.my) {
                    creepBody = [
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE,
                        MOVE, MOVE, MOVE, MOVE, MOVE
                        ]
                } else {
                    creepBody = [CLAIM, WORK, CARRY, MOVE, MOVE, MOVE]
                }
            }
        } else {
            creepBody = [CLAIM, WORK, CARRY, MOVE, MOVE, MOVE]
        }
        
    } else {
        Memory.rooms[roomB] = {}
    }
    
    if (Game.spawns[roomA + '_e'].energy > 299) {
        if (Game.spawns[roomA + '_e'].spawnCreep(creepBody, 'colonizator' + Game.time, {memory: {role: 'colonizator', target: roomB}}) == OK) {
            console.log('In room ' + roomA + ' успешно создан колонизатор.');
            return true;
        } else {
            console.log('In room ' + roomA + ' не удалось создать колонизатора:( Ошибка: ' +
            Game.spawns[roomA + '_e'].spawnCreep(creepBody, 'colonisator' + Game.time, {memory: {role: 'colonizator', target: roomB}}));
        }
    }
};