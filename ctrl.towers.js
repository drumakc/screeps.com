module.exports = function() {
    for (let roomName in Memory.towers) {
        if (Game.rooms[roomName]) {
            if (Game.rooms[roomName].controller) {
                if (Game.rooms[roomName].controller.level > 2) {
                    for (let i in Memory.towers[roomName]) {
                        let obj = Game.getObjectById(Memory.towers[roomName][i]);
                        
                        if (obj) {
                            if (obj.store[RESOURCE_ENERGY] > 0 ) {
                                if (repairRoads(obj)) {
                                    
                                } else {
                                    if (healCreeps(obj)) {
                                        
                                    } else {
                                        if (attackHostileCreeps(obj)) {
                                            
                                        } else {
                                            if (Game.rooms[roomName].controller.ticksToDowngrade > 10000) {
                                                if (repairStructures(obj)) {
                                                    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            delete Memory.towers[roomName][i];
                        }
                    }
                }
            } else {
                delete Memory.towers[roomName];
            }
        } else {
            delete Memory.towers[roomName];
        }
    }
    
    function repairRoads(twr) {
        let targets = twr.room.find(FIND_STRUCTURES, {filter: (o) => {return o.structureType == STRUCTURE_ROAD && o.hits < (o.hitsMax * 0.9)}});
        
        if (targets.length > 0) {
            let target = twr.pos.findClosestByRange(targets);
            
            if (twr.repair(target) == OK) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    function healCreeps(twr) {
        let targets = twr.room.find(FIND_MY_CREEPS, {filter: (c) => {return c.hits < c.hitsMax}});
        
        if (targets.length > 0) {
            let target = twr.pos.findClosestByRange(targets);
            
            if (twr.heal(target) == OK) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    function repairStructures(twr) {
        if (twr.room.controller) {
            if (twr.room.controller.ticksToDowngrade > 10000 && twr.energy > 500) {
            
                let targets = twr.room.find(FIND_STRUCTURES, {filter: (s) => {return s.hits < (s.hitsMax * twr.room.controller.level * 0.1)
                        /*&& s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART*/
                }});
                
                if (targets.length > 0) {
                    targets.sort((a, b) => {return a.hits - b.hits});
                    
                    let target = targets[0];
                    
                    if (twr.repair(target) == OK) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    
    function attackHostileCreeps(twr) {
        let targets = twr.room.find(FIND_HOSTILE_CREEPS);
        
        if (targets.length > 0) {
            let target = twr.pos.findClosestByRange(targets);
            
            if (twr.attack(target) == OK) {
                return true;
            }
        } else {
            return false;
        }
    }
};