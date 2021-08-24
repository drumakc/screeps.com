
module.exports = function() {
    if (Memory.calcTransactionCost < 5000) {
        Memory.calcTransactionCost+=100;
    }
    
    console.log('ctrl.market = Memory.calcTransactionCost = ' + Memory.calcTransactionCost);
    for (var roomName in Game.rooms) {
        if (Game.rooms[roomName].terminal) {
            if (Game.rooms[roomName].terminal.cooldown > 0) {
                
            } else {
                for (var resourceType in Game.rooms[roomName].terminal.store) {
                    if (resourceType == 'G') {
                        
                    } else {
                        let offer = {resourceType: resourceType, roomName: roomName};
                        let allBuyOrders = Game.market.getAllOrders(order => order.type == 'buy' && order.resourceType == offer.resourceType );
                        let allPrices = [];
                        let buyOrders = [];
                        
                        for (var i in allBuyOrders) {
                            allPrices[i] = allBuyOrders[i].price;
                        }
                        allPrices.sort((a, b) => a - b);
                        let minPrice = allPrices[0];
                        let maxPrice = allPrices[allPrices.length - 1];
                        let mediumPrice = (maxPrice + minPrice) / 2;
                        
                        for (var i in allBuyOrders) {
                            if (allBuyOrders[i].price > mediumPrice) {
                                buyOrders.push(allBuyOrders[i]);
                            }
                        }
                        buyOrders.sort((a, b) => b.price - a.price);
                        
                        if (buyOrders.length > 1) {
                            if (Game.market.calcTransactionCost(10000, buyOrders[0].roomName, offer.roomName) < Memory.calcTransactionCost && buyOrders[0].price > minPrice/* * 2*/) {
                                if (Game.market.deal(buyOrders[0].id, Game.rooms[roomName].terminal.store[resourceType], roomName) == 0) {
                                    console.log(
                                        'В комнате ' + roomName +
                                        ' продал ' + resourceType + 
                                        ' по цене ' + buyOrders[0].price + ' кредитов.'
                                    );
                                    Memory.calcTransactionCost = 100;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};