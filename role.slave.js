//проверка того что upgrader берет энергию из link

const findSourcesActive = require('find.sourcesActive');
const findEnergyInClosestLink = require('find.energyInClosestLink');
const orderDownload = require('order.download');
const orderTransferEnergyFromLinkToLink = require('order.transferEnergyFromLinkToLink');

module.exports = function (creep) {
    
    if (creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.order = 'download';
    }
    
    if (creep.store[RESOURCE_ENERGY] == 50) {
        creep.memory.order = 'upload';
    }
    
    if (creep.memory.order == 'download') {
        if (findEnergyInClosestLink(creep)) {
            creep.say('closest+');
        } else {
            creep.say('closest-');
            
            if (orderTransferEnergyFromLinkToLink(creep)) {
                creep.say('link->link');
            }
        }
    }
    
    if (creep.memory.order == 'upload') {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
};