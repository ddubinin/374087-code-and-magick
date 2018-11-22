
var CLOUD_WIDTH = 420; // ширина канваса
var CLOUD_HEIGHT = 270; // высота канваса
var CLOUD_X = 100; // ось х
var CLOUD_Y = 10; // ось y
var GAP = 10; // какой-то гэп
var FONT_GAP = 50; // гэп между текстов?
var BAR_MAX_HEIGHT = 150; //высота колонки
var BAR_WIDTH = 40; //ширина коронки


var renderCloud = function(ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var getMaxElement = function(arr) {
  var maxElement = arr[0];  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
window.renderStatistics = function(ctx, players, times) {

	renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
	renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');  
	var maxTime = getMaxElement(times);
	ctx.fillStyle = '#000'; 
	ctx.font = '16px PT Mono';
	ctx.textBaseline = 'hanging'; 
	ctx.fillText('Ура вы победили!', 130, 30);
	ctx.fillText('Список результатов:', 130, 50);
	for(var i = 0; i < players.length; i++){
		var barHeight = Math.round(BAR_MAX_HEIGHT * times[i] / maxTime); //высота колонки
		var barStartPosX = FONT_GAP  + CLOUD_X + (BAR_WIDTH + FONT_GAP) * i; // начальный х
		var barStartPosY = CLOUD_HEIGHT - barHeight - GAP * 2 ; // начальынй y
		ctx.fillStyle = '#000'; 
		ctx.fillText(barHeight,barStartPosX,barStartPosY - GAP * 2); // значение высоты бара надо ним
		if(players[i] === 'Вы'){
			ctx.fillStyle = 'rgba(255, 0, 0, 1)';
		}else{
			ctx.fillStyle = 'rgba(2, 14, 134, '+Math.random()+')'; 
		}
		ctx.fillRect(barStartPosX,barStartPosY,BAR_WIDTH,barHeight); // сам бар
		ctx.fillStyle = '#000'; 
		ctx.fillText(players[i],barStartPosX, CLOUD_HEIGHT - GAP); // имя игрока
	}
};
