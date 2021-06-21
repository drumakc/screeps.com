const findConstructionSites = require('find.constructionSites');
const findSourcesActive = require('find.sourcesActive');
const orderHarvestEnergy = require('order.harvestEnergy');

module.exports = function (creep) {
    if (creep.memory.order) {
        switch (creep.memory.order) {
            case 'download':
                if (creep.store.getFreeCapacity() > 0) {
                    creep.memory.role = 'harvester';
                } else {
                    creep.memory.order = 'upload';
                }
                break;
            case 'upload':
                if (creep.store.getUsedCapacity() > 0) {
                    if (creep.memory.targetForBuilding) {
                        let target = Game.getObjectById(creep.memory.targetForBuilding.id);
                        
                        if (target) {
                            if (creep.build(target) == OK) {
                                creep.say('🏗️');
                            } else if (creep.build(target) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(target);
                            } else {
                                creep.say('b err=' + creep.build(target));
                            }
                        } else {
                            creep.memory.targetForBuilding = false;
                        }
                    } else {
                        if (findConstructionSites(creep)) {
                            
                        } else {
                            creep.memory = false;
                            creep.memory.role = 'upgrader';
                        }
                    }
                } else {
                    creep.memory.order = 'download';
                }
                break;
        }
    } else {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.order == 'download';
        } else {
            creep.memory.order == 'upload';
        }
    }
};