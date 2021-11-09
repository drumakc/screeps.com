const findConstructionSites = require('find.constructionSites');
const findEmptyContainer = require('find.emptyContainer');
const findEmptyLink = require('find.emptyLink');
const findEmptyStructure = require('find.emptyStructure');
const findEmptyTower = require('find.emptyTower');
const findEnergyInContainer = require('find.energyInContainer');
const findSourcesActive = require('find.sourcesActive');
const orderDownload = require('order.download');
const orderHarvestEnergy = require('order.harvestEnergy');
const orderUpload = require('order.upload');
const roomHaveEnergy = require('room.haveEnergy');

module.exports = function(creep) {
    if (creep.memory.order) {
        if (creep.memory.order == 'download') {
            if (creep.store.getUsedCapacity() > 0) {
                creep.memory.order = 'upload';
                creep.say('h↑');
            } else {
                if (findSourcesActive(creep)) {
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
                if (creep.memory.targetForUpload) {
                    if (creep.store[RESOURCE_ENERGY]) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else {
                        for (let resource in creep.store) {
                            orderUpload(creep, resource);
                        }
                    }
                } else {
                    if (creep.store[RESOURCE_ENERGY]) {
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
                        } else if (creep.room.terminal) {
                            if (creep.room.terminal.store[RESOURCE_ENERGY] < 30000) {
                                creep.memory.targetForUpload = creep.room.terminal;
                                orderUpload(creep, RESOURCE_ENERGY);
                            } else if (findConstructionSites(creep)) {
                                creep.memory.role = 'builder';
                            } else {
                                creep.memory.role = 'upgrader';
                            }
                        } else if (findConstructionSites(creep)) {
                            creep.memory.role = 'builder';
                        } else {
                            creep.memory.role = 'upgrader';
                        }
                    } else {
                        if (creep.room.terminal) {
                            if (creep.room.terminal.store.getFreeCapacity() > 0) {
                                creep.memory.targetForUpload = creep.room.terminal;
                            }
                        } else if (creep.room.storage) {
                            if (creep.room.storage.store.getFreeCapacity() > 0) {
                                creep.memory.targetForUpload = creep.room.storage;
                            }
                        } else {
                            creep.say('!3space');
                        }
                    }
                }
            }
        } else if (creep.memory.order == 'downloadFromTarget') {
            if (orderDownload(creep)) {
                
            } else {
                delete creep.memory.order;
            }
        } else if (creep.memory.order == 'harvestEnergy') {
            if (creep.getActiveBodyparts(WORK) > 0) {
                if (orderHarvestEnergy(creep)) {
                        
                } else if (findEnergyInContainer(creep)) {
                    creep.memory.order = 'downloadFromTarget';
                } else {
                    creep.say('h↓ err');
                }
            } else {
                creep.memory.order = false;
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