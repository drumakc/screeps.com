const findHostileCreep = require('find.hostileCreep');
const orderAttackHostileCreep = require('order.attackHostileCreep');

module.exports = function (creep) {
    if (creep.memory.target) {
        let target = Game.getObjectById(creep.memory.target.id);
        
        if (target) {
            if (creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
                if (creep.rangedAttack(target) == OK) {
                    creep.attack(target);
                    creep.moveTo(target);
                } else if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else {
                    creep.attack(target)
                }
            } else if (creep.getActiveBodyparts(ATTACK) > 0) {
                if (creep.attack(target) == OK) {
                    creep.moveTo(target);
                } else if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else {
                    creep.say('err=' + creep.attack(target));
                }
            }
        } else {
            delete creep.memory.target;
        }
    } else {
        let targets = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if (targets.length > 0) {
            creep.memory.target = creep.pos.findClosestByPath(targets);
            if (orderAttackHostileCreep(creep)) {
                
            } else {
                creep.say('err=' + orderAttackHostileCreep(creep));
            }
        } else {
            creep.say('noTargets');
        }
    }
};