const findConstructionSites = require('find.constructionSites');
const findDroppedResources = require('find.droppedResources');
const findEmptyContainer = require('find.emptyContainer');
const findEmptyLink = require('find.emptyLink');
const findEmptyStructure = require('find.emptyStructure');
const findEmptyTower = require('find.emptyTower');
const findEnergyInContainer = require('find.energyInContainer');
const findSourcesActive = require('find.sourcesActive');
const findTombstone = require('find.tombstone');
const orderDownload = require('order.download');
const orderHarvestEnergy = require('order.harvestEnergy');
const orderPickupDroppedResource = require('order.pickupDroppedResource');
const orderUpload = require('order.upload');
const roomHaveEnergy = require('room.haveEnergy');

module.exports = function(creep) {
    if (creep.memory.order) {
        if (creep.memory.order == 'download') {
            if (creep.store.getUsedCapacity() > 0) {
                creep.memory.order = 'upload';
                creep.say('h↑');
            } else {
                //creep.say('h↓');
                
                if (findDroppedResources(creep)) {
                    creep.memory.order = 'pickupDroppedResource';
                } else if (findTombstone(creep)) {
                    creep.memory.order = 'downloadFromTarget';
                } else if (findSourcesActive(creep)) {
                    creep.memory.order = 'harvestEnergy';
                } else if (findEnergyInContainer(creep)) {
                    creep.memory.order = 'downloadFromTarget';
                } else {
                    creep.memory = false;;
                    creep.memory.role = 'upgrader';
                }
            }            
        } else if (creep.memory.order == 'upload') {
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.order = 'download';
                creep.say('h↓');
            } else {
                //creep.say('h↑');
                
                if (creep.memory.targetForUpload) {
                    orderUpload(creep, RESOURCE_ENERGY);
                } else {
                    if (findEmptyContainer(creep)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findEmptyStructure(creep, STRUCTURE_EXTENSION)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findEmptyStructure(creep, STRUCTURE_SPAWN)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findEmptyTower(creep)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findEmptyLink(creep)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findConstructionSites(creep)) {
                        creep.memory.role = 'builder';
                    } else {
                        creep.memory.role = 'upgrader';
                    }
                }
            }
        } else if (creep.memory.order == 'downloadFromTarget') {
            if (orderDownload(creep)) {
                
            } else {
                delete creep.memory.order;
            }
        } else if (creep.memory.order == 'harvestEnergy') {
            if (orderHarvestEnergy(creep)) {
                    
            } else if (findEnergyInContainer(creep)) {
                creep.memory.order = 'downloadFromTarget';
            } else {
                //creep.say('h↓ err');
            }
        } else if (creep.memory.order == 'pickupDroppedResource') {
            if (orderPickupDroppedResource(creep)) {
                
            } else {
                delete creep.memory.targetForDownload;
            }
        } else {
            creep.memory = false;
        }
    } else {
        if (creep.store.getUsedCapacity() == 0) {
            creep.say('h↓');
            creep.memory.order = 'download';
        } else if (creep.store.getFreeCapacity() == 0) {
            creep.say('h↑');
            creep.memory.order = 'upload';
        } else {
            creep.say('h↑');
            creep.memory.order = 'upload';
        }
    }
}