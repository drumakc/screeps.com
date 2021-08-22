module.exports = function () {
    for (let roomName in Memory.rooms) {
        for (let i in Memory.rooms[roomName].sources) {
            let src = Game.getObjectById(Memory.rooms[roomName].sources[i].id);
            let txt = src.energy + '/' + src.ticksToRegeneration;
            let colorRed = '#FE0303';
            let colorGreen = '#35FE03';
            let txtColor;
            
            if (src.energy < src.ticksToRegeneration * 10) {
                txtColor = colorGreen;
            } else {
                txtColor = colorRed;
            }
            
            
            new RoomVisual(roomName).text(txt, src.pos.x, src.pos.y - 1, {color: txtColor, font: 0.5});
        }
    }
};