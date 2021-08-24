 module.exports = function () {
    let colorRed = '#FE0303';
    let colorGreen = '#35FE03';
    let txtColor;
    let txt;
    
    for (let roomName in Memory.rooms) {
        //energy sources amount
        for (let i in Memory.rooms[roomName].sources) {
            let src = Game.getObjectById(Memory.rooms[roomName].sources[i].id);
            txt = src.energy + '/' + src.ticksToRegeneration;
            
            if (src.energy < src.ticksToRegeneration * 10) {
                txtColor = colorGreen;
            } else {
                txtColor = colorRed;
            }
            
            new RoomVisual(roomName).text(txt, src.pos.x, src.pos.y - 1, {color: txtColor, font: 0.8});
        }
        
        //mineral amount in mineral source
        let mineral = Game.getObjectById(Memory.rooms[roomName].mineral.id);
        
        if (mineral.mineralAmount > 0) {
            txtColor = colorGreen;
            txt = mineral.mineralAmount;
        } else {
            txtColor = colorRed;
            txt = mineral.ticksToRegeneration;
        }
        
        new RoomVisual(roomName).text(txt, mineral.pos.x, mineral.pos.y - 1, {color: txtColor, font: 0.8});
    }
};