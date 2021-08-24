module.exports = function (creep) {
    let target = Game.getObjectById(Memory.rooms[creep.room.name].mineral.id);
    
    if (target.mineralAmount > 0) {
        return true;
    } else {
        return false;
    }
};