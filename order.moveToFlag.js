 module.exports = function (creep) {
    if (creep.memory.flagCount > 0) {
        if (Game.flags['Flag' + creep.memory.flagCount]) {
            let targets = creep.pos.findInRange(FIND_FLAGS, 0, {filter: (obj) => {
                return obj.name == 'Flag' + creep.memory.flagCount
            }});
            
            if (targets.length > 0) {
                creep.memory.flagCount++;
                creep.moveTo(Game.flags['Flag' + creep.memory.flagCount]);
            } else {
                creep.moveTo(Game.flags['Flag' + creep.memory.flagCount]);
            }
            return true;
        } else {
            return false;
        }
    } else {
        creep.memory.flagCount = 1;
        return true;
    }
};