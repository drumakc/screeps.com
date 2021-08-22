
module.exports = function () {
    for (let roomName in Memory.towers) {
        for (let i in Memory.towers[roomName]) {
            let twr = Game.getObjectById(Memory.towers[roomName][i]);
            
            if (twr) {
                if (twr.store[RESOURCE_ENERGY] > 0) {
                    let hostileCreeps = twr.room.find(FIND_HOSTILE_CREEPS);
                    
                    if (hostileCreeps.length > 0) {
                        let target = twr.pos.findClosestByRange(hostileCreeps);
                        
                        if (target) {
                            twr.attack(target);
                        }
        
                        if (Game.rooms[roomName].controller.safeModeAvailable == 0) {
                            Game.rooms[roomName].controller.activateSafeMode();
                        }
                    }
                }
            } else {
                delete Memory.towers[roomName][i];
            }
        }
    }
};