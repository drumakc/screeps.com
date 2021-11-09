const orderDownload = require('order.download');
const orderUpload = require('order.upload');
const roomHaveMineral = require('room.haveMineral');

module.exports = function (creep) {
    if (creep.memory.order) {
        switch (creep.memory.order) {
            case 'download':
                creep.say('m↓');
                
                if (creep.store.getFreeCapacity() == 0) {
                    creep.memory.order = 'upload';
                    creep.say('m↑');
                } else {
                    if (roomHaveMineral(creep)) {
                        creep.memory.order = 'harvest';
                    } else {
                        delete creep.memory;
                        creep.memory.role = 'harvester';
                    }
                }
                break;
            case 'upload':
                if (creep.store.getUsedCapacity() == 0) {
                    creep.memory.order = 'download';
                    creep.say('m↓');
                } else {
                    if (creep.memory.targetForUpload) {
                        if (orderUpload(creep, Memory.rooms[creep.room.name].mineral.mineralType)) {
                            
                        } else {
                            creep.memory.order = false;
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
                break;
            case 'downloadFromTarget':
                if (orderDownload(creep)) {
                    
                } else {
                    creep.memory.order = false;
                }
            case 'harvest':
                if (creep.getActiveBodyparts(WORK) > 0) {
                    let target = Game.getObjectById(Memory.rooms[creep.room.name].mineral.id);
                            
                    if (target) {
                        if (target.mineralAmount > 0) {
                            let extractor = Game.getObjectById(Memory.rooms[creep.room.name].extractor.id);
                            
                            if (extractor) {
                                if (extractor.cooldown == 0) {
                                    if (creep.harvest(target) == OK) {
                                        creep.say(creep.store.getUsedCapacity());
                                        if (creep.store.getFreeCapacity() == 0) {
                                            creep.memory.order = 'upload';
                                        }
                                    } else if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(target);
                                    } else if (creep.harvest(target) == ERR_TIRED) {
                                                
                                    } else {
                                        creep.say('err=' + creep.harvest(target));
                                    }
                                }
                            } else {
                                creep.memory.order = false;
                            }
                        } else {
                            delete creep.memory;
                            creep.memory.role = 'harvester';
                        }
                    } else {
                        creep.memory.order = false;
                    }
                } else {
                    creep.memory.order = false;
                }
                break;
        }
    } else {
        if (creep.store.getUsedCapacity() == 0) {
            creep.say('m↓');
            creep.memory.order = 'download';
        } else {
            creep.say('m↑');
            creep.memory.order = 'upload';
        }
    }
};