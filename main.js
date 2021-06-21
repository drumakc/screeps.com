const ctrlCreeps = require('ctrl.creeps');
const ctrlMemory = require('ctrl.memory');
const ctrlSpawning = require('ctrl.spawning');

ctrlMemory();

module.exports.loop = function () {
    try {
        ctrlCreeps();
        
        if (Game.time % 99 == 0/* && Game.cpu.bucket > 100*/) {
            ctrlSpawning();
        }
    } catch (err) {
        console.log(err);
    }
}