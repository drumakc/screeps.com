const orderMoveToFlag = require('order.moveToFlag');

module.exports = function (creep) { 
    if (creep.room.name == creep.memory.target) {
        if (creep.room.controller.my) {
            delete creep.memory;
            creep.memory.role = 'harvester';
        } else {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            } else if (creep.claimController(creep.room.controller) == OK) {
                Memory.rooms[creep.room.name] = {};    
            } else {
                creep.memory.role = 'harvester';
            }
        }
    } else {
        if (orderMoveToFlag(creep, 'colonizator')) {
            
        } else {
            creep.memory.role = 'harvester';
        }
    }
};