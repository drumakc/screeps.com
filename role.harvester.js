const findConstructionSites = require('find.constructionSites');
const findEmptyStructure = require('find.emptyStructure');
const findSourcesActive = require('find.sourcesActive');
const orderHarvestEnergy = require('order.harvestEnergy');
const orderUpload = require('order.upload');

module.exports = function(creep) {

    if (creep.memory.order) {
        if (creep.memory.order == 'download') {
            if (creep.store.getFreeCapacity() == 0) {
                creep.memory.order = 'upload';
            } else {
                creep.say('h↓');

                if (findSourcesActive(creep)) {
                    orderHarvestEnergy(creep);
                }
            }            
        } else if (creep.memory.order == 'upload') {
            if (creep.store.getUsedCapacity() == 0) {
                creep.memory.order = 'download';
            } else {
                creep.say('h↑');
                
                if (creep.memory.targetForUpload) {
                    orderUpload(creep, RESOURCE_ENERGY);
                } else {
                    if (findEmptyStructure(creep, STRUCTURE_CONTAINER)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findEmptyStructure(creep, STRUCTURE_EXTENSION)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findEmptyStructure(creep, STRUCTURE_SPAWN)) {
                        orderUpload(creep, RESOURCE_ENERGY);
                    } else if (findConstructionSites(creep)) {
                        creep.memory.role = 'builder';
                    } else {
                        creep.memory.role = 'upgrader';
                    }
                }
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