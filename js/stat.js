'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var CONTENT_GAP = 20;
var CONTENT_X = CLOUD_X + CONTENT_GAP;
var CONTENT_Y = CLOUD_Y + CONTENT_GAP;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var createFontStyle = function (ctx, font, baseline, color) {
  ctx.font = font;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomColorSaturation = function (hue, lightness) {
  var saturation = getRandomInt(100);
  var randomSaturation = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  return randomSaturation;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  createFontStyle(ctx, '16px PT Mono', 'hanging', '#000000');
  ctx.fillText('Ура вы победили!', CONTENT_X, CONTENT_Y);
  ctx.fillText('Список результатов:', CONTENT_X, CONTENT_Y + CONTENT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var BAR_HEIGHT = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var BAR_X = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var BAR_Y_BOTTOM = CLOUD_Y + CLOUD_HEIGHT - BAR_GAP;

    createFontStyle(ctx, '16px PT Mono', 'hanging', '#000');
    ctx.fillText(players[i], BAR_X, BAR_Y_BOTTOM + GAP);
    ctx.fillText(Math.round(times[i]), BAR_X, BAR_Y_BOTTOM - BAR_HEIGHT - FONT_GAP);

    ctx.fillStyle = players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomColorSaturation(240, 50);
    ctx.fillRect(BAR_X, BAR_Y_BOTTOM - BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);
  }
};
