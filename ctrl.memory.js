module.exports = function() {
    if (Memory.spawns) {
        for (let roomName in Game.rooms) {
            if (Memory.spawns[roomName]) {
                let targets = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
                    filter: (obj) => {
                        return obj.structureType == STRUCTURE_SPAWN
                    }
                })
                
                if (Memory.spawns[roomName].length == targets.length) {

                } else {
                    Memory.spawns[roomName] = targets;
                }
            } else {
                Memory.spawns[roomName] = {};
            }
        }
    } else {
        Memory.spawns = {};
    }

    if (Memory.rooms) {
        for (let roomName in Game.rooms) {
            if (Memory.rooms[roomName]) {
                if (Memory.rooms[roomName].sources) {

                } else {
                    Memory.rooms[roomName].sources = Game.rooms[roomName].find(FIND_SOURCES);
                }
            } else {
                Memory.rooms[roomName] = {};
            }
            
            if (Memory.rooms[roomName].mineral) {
                
            } else {
                let minerals = Game.rooms[roomName].find(FIND_MINERALS);
                Memory.rooms[roomName].mineral = minerals[0];
            } 
        }
    } else {
        Memory.rooms = {};
    }
    
    if (Memory.towers) {
        for (let roomName in Game.rooms) {
            if (Memory.towers[roomName]) {
                let targets = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (obj) => {return obj.structureType == STRUCTURE_TOWER}});
                
                if (targets.length > 0) {
                    for (let i = 0; i < targets.length; i++) {
                        Memory.towers[roomName][i] = targets[i].id;
                    }
                }
            } else {
                Memory.towers[roomName] = [];
            }
        }
    } else {
        Memory.towers = {};
    }
}