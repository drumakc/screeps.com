
module.exports = function () {
    for (let roomName in Memory.towers) {
        for (let i in Memory.towers[roomName]) {
            let twr = Game.getObjectById(Memory.towers[roomName][i]);
            
            if (twr) {
                let hostileCreeps = twr.room.find(FIND_HOSTILE_CREEPS);
                        
                if (hostileCreeps.length > 0) {
                    let target = twr.pos.findClosestByRange(hostileCreeps);
                            
                    if (twr.store[RESOURCE_ENERGY] > 0) {
                        if (target) {
                            twr.attack(target);
                        }
                    }
                        
                    if (Game.rooms[roomName].controller.safeModeAvailable > 0) {
                        if (target.ticksToLive < 1300) {
                            Game.rooms[roomName].controller.activateSafeMode();
                        }
                    } else {
                        if (target.ticksToLive < 1490) {
                            
                            let defenders = twr.room.find(FIND_MY_CREEPS, {filter: (obj) => {
                                return obj.memory.role == 'defender';
                            }});
                                
                            if (defenders.length < 6) {
                                Game.spawns[roomName + '_e'].spawnCreep([
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, 
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,  
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                                    ], 'defender' + Game.time, {memory: {role: 'defender'}});
                                    
                                Game.spawns[roomName + '_e'].spawnCreep([
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, 
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,  
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                                    ], 'defender' + Game.time, {memory: {role: 'defender'}});
                                    
                                Game.spawns[roomName + '_e'].spawnCreep([
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, 
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                                    ], 'defender' + Game.time, {memory: {role: 'defender'}});
                                    
                                Game.spawns[roomName + '_e'].spawnCreep([
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                                    ], 'defender' + Game.time, {memory: {role: 'defender'}});
                                    
                                Game.spawns[roomName + '_e'].spawnCreep([
                                    MOVE, MOVE, MOVE, MOVE, MOVE,
                                    RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
                                    ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
                                    MOVE, MOVE, MOVE, MOVE, MOVE
                                    ], 'defender' + Game.time, {memory: {role: 'defender'}});
                            }
                        }
                    }
                }
            } else {
                delete Memory.towers[roomName][i];
            }
        }
    }
}