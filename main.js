const ctrlCreeps = require('ctrl.creeps');
const ctrlDefense = require('ctrl.defense');
const ctrlMemory = require('ctrl.memory');
const ctrlSpawning = require('ctrl.spawning');
const ctrlTowers = require('ctrl.towers');
const ctrlRoomVisual = require('ctrl.room.visual');

ctrlMemory();

module.exports.loop = function () {
    try {
        ctrlCreeps();
        ctrlTowers();
        ctrlDefense();
        ctrlRoomVisual();
        
        if (Game.time % 49 == 0 && Game.cpu.bucket > 100) {
            ctrlSpawning();
        }
        
        if (Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
    } catch (err) {
        console.log(err);
    }
}