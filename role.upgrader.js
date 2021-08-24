const findSourcesActive = require('find.sourcesActive');
const findEnergyInClosestLink = require('find.energyInClosestLink');
const orderDownload = require('order.download');
const orderTransferEnergyFromLinkToLink = require('order.transferEnergyFromLinkToLink');
const roomNeedMiner = require('room.needMiner');

module.exports = function (creep) {
    if (creep.memory.order) {
        switch (creep.memory.order) {
            case 'download':
                if (creep.store.getFreeCapacity() > 0) {
                    if (findEnergyInClosestLink(creep)) {
                        orderDownload(creep, RESOURCE_ENERGY);
                    } else {
                        if (orderTransferEnergyFromLinkToLink(creep)) {
                            if (findEnergyInClosestLink(creep)) {
                                
                            } else {
                                if (roomNeedMiner(creep.room.name)) {
                                    delete creep.memory;
                                    creep.memory.role = 'miner';
                                    creep.memory.order = 'download';
                                    creep.say('m↓');
                                } else {
                                    creep.memory.role = 'harvester';
                                }
                            }
                        } else {
                            if (roomNeedMiner(creep.room.name)) {
                                delete creep.memory;
                                creep.memory.role = 'miner';
                                creep.memory.order = 'download';
                                creep.say('m↓');
                            } else {
                                creep.memory.role = 'harvester';
                            }
                        }
                    }  
                } else {
                    creep.memory.order = 'upload';
                }
                break;
            case 'upload':
                if (creep.store[RESOURCE_ENERGY] == 0) {
                    creep.say('u↑->u↓');
                    creep.memory.order = 'download';
                } else {
                    if (creep.upgradeController(creep.room.controller) == OK) {
                        
                    } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    } else {
                        creep.say('u err=' + creep.upgradeController(creep.room.controller));
                    }
                }
                break;
            case 'downloadFromTarget':
                if (orderDownload(creep)) {
                
                } else {
                    delete creep.memory.order;
                }
                break;
        }
    } else {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.say('u↓');
            creep.memory.order = 'download';
        } else {
            creep.say('u↑');
            creep.memory.order = 'upload';
        }
    }
};