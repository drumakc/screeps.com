
module.exports = function() {
    for (let roomName in Memory.towers) {
        if (Game.rooms[roomName].controller.level > 3) {
            for (let i in Memory.towers[roomName]) {
                let obj = Game.getObjectById(Memory.towers[roomName][i]);
                
                if (obj) {
                    console.log(Memory.towers[roomName][i]);
                } else {
                    delete Memory.towers[roomName][i];
                }
            }
        }
    }
};