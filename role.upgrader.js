
const findDroppedResources = require('find.droppedResources');
const findSourcesActive = require('find.sourcesActive');
const findEnergyInClosestLink = require('find.energyInClosestLink');
const findTombstone = require('find.tombstone');
const orderDownload = require('order.download');
const orderPickupDroppedResource = require('order.pickupDroppedResource');
const orderTransferEnergyFromLinkToLink = require('order.transferEnergyFromLinkToLink');

module.exports = function (creep) {
    if (creep.memory.order) {
        switch (creep.memory.order) {
            case 'download':
                if (creep.store.getFreeCapacity() > 0) {
                    if (findDroppedResources(creep)) {
                        creep.memory.order = 'pickupDroppedResource';
                    } else if (findTombstone(creep)) {
                        creep.memory.order = 'downloadFromTarget';
                    } else if (findEnergyInClosestLink(creep)) {
                        orderDownload(creep, RESOURCE_ENERGY);
                    } else {
                        if (orderTransferEnergyFromLinkToLink(creep)) {
                            
                        } else {
                            creep.memory.role = 'harvester'; 
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
            case 'pickupDroppedResources':
                if (orderPickupDroppedResource(creep)) {
                    
                } else {
                    delete creep.memory.targetForDownload;
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