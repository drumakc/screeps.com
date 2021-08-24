//учу определять может ли дойти до цели
const orderHarvestEnergy = require('order.harvestEnergy');

module.exports = function (creep) {
    let origin = creep.pos;
    let goal = Game.getObjectById('612392867cdaa113a559c206');
    
    creep.moveTo(goal);
};