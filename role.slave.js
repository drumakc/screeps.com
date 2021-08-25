//учу идти от флага к флагу
const orderMoveToFlag = require('order.moveToFlag');

module.exports = function (creep) {
    if (orderMoveToFlag(creep)) {
        
    } else {
        creep.say('stop');
    }
};