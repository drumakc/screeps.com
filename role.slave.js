//учу идти от флага к флагу
//const orderMoveToFlag = require('order.moveToFlag');

//разобрать стену чтоб можно было выйти из комнаты

module.exports = function (creep) {
    /*if (orderMoveToFlag(creep)) {
        
    } else {
        creep.say('stop');
    }*/
    
    let target = Game.getObjectById('579504940bf6404631f8d72b');
    
    if (creep.memory.order) {
        if (creep.memory.order == 'download') {
            if (creep.store.getFreeCapacity() == 0) {
                creep.memory.order = 'upload';
            } else {
                if (target) {
                    if (creep.dismantle(target) == OK) {
                        creep.say(creep.store.getUsedCapacity());
                    } else if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    } else {
                        creep.say('err=' + creep.dismantle(target));
                    }
                } else {
                    creep.memory = false;
                    creep.memory.role = 'builder';
                }
            }
        }
        
        if (creep.memory.order == 'upload') {
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.order = 'download';
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    } else {
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.order = 'download';
        }
        
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.order = 'upload';
        }
    }
};