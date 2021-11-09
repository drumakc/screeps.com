const findDroppedResources = require('find.droppedResources');
const findEmptyLink = require('find.emptyLink');
const findEmptyStructure = require('find.emptyStructure');
const findEmptyTower = require('find.emptyTower');
const findEnergyInContainer = require('find.energyInContainer');
const findTombstone = require('find.tombstone');
const orderDownload = require('order.download');
const orderPickupDroppedResource = require('order.pickupDroppedResource');
const orderUpload = require('order.upload');

module.exports = function (creep) {
    if (creep.memory.order) {
        switch (creep.memory.order) {
            case 'download':
                if (creep.store.getUsedCapacity() > 0) {
                    creep.memory.order = 'upload';
                    creep.say('c↑');
                } else {
                    if (findDroppedResources(creep)) {
                        creep.memory.order = 'pickupDroppedResource';
                    } else if (findTombstone(creep)) {
                        creep.memory.order = 'downloadFromTarget';
                    } else if (findEnergyInContainer(creep)) {
                        creep.memory.order = 'downloadFromTarget';
                    } else {
                        creep.say('.zZ');
                    }
                }
                break;
            case 'upload':
                if (creep.store.getUsedCapacity() == 0) {
                    creep.memory.order = 'download';
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
                            if (findEmptyStructure(creep, STRUCTURE_EXTENSION)) {
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
                                } else if (findEmptyStructure(creep, STRUCTURE_TOWER)) {
                                    orderUpload(creep, RESOURCE_ENERGY);
                                } else if (findEmptyStructure(creep, STRUCTURE_LINK)) {
                                    orderUpload(creep, RESOURCE_ENERGY);
                                } else if (findEmptyStructure(creep, STRUCTURE_STORAGE)) {
                                    orderUpload(creep, RESOURCE_ENERGY);
                                } else {
                                    creep.say('.zZ');
                                }
                            } else if (findEmptyStructure(creep, STRUCTURE_TOWER)) {
                                orderUpload(creep, RESOURCE_ENERGY);
                            } else if (findEmptyStructure(creep, STRUCTURE_LINK)) {
                                orderUpload(creep, RESOURCE_ENERGY);
                            } else if (findEmptyStructure(creep, STRUCTURE_STORAGE)) {
                                orderUpload(creep, RESOURCE_ENERGY);
                            } else {
                                creep.say('.zZ');
                            }
                        } else {
                            if (creep.room.terminal) {
                                if (creep.room.terminal.store.getFreeCapacity() > 0) {
                                    creep.memory.targetForUpload = creep.room.terminal;
                                } else if (creep.room.storage) {
                                    if (creep.room.storage.store.getFreeCapacity() > 0) {
                                        creep.memory.targetForUpload = creep.room.storage;
                                    }
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
                break;
            case 'pickupDroppedResource':
                if (orderPickupDroppedResource(creep)) {
                    
                } else {
                    creep.memory.order = false;
                }
                break;
            case 'downloadFromTarget':
                if (orderDownload(creep)) {
                    
                } else {
                    creep.memory.order = false;
                }
        }
    } else {
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.order = 'download';
        } else {
            creep.memory.order = 'upload';
        }
    }
};