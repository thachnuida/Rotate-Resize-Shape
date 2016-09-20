
var $drawArea = $('.draw-area');
var $rect = $('.rect');
var rectW = 50;
var rectH = 100;
var rectTop = 100;
var rectLeft = 100;
var rectRotate = -30;
var pointLeft = rectLeft;
var pointTop = rectTop;
var $point = $('.test-point');
var $oldPoint = $('.old-point');
var $originRect = $('.origin-rect');
var rotatedPointTopLeft, newPoint, rotatedPointTopRight, rotatedPointBottomLeft, rotatedPointBottomRight;

function draw() {
    $rect.width(rectW).height(rectH).css({top: rectTop, left: rectLeft, transform: 'rotate(' + rectRotate + 'deg)'});
    $originRect.width(rectW).height(rectH).css({top: rectTop, left: rectLeft});

    // Caculate conner points
    rotatedPointTopLeft = calRotatePoint({top: rectTop, left: rectLeft}, rectW, rectH, rectRotate, 'top-left');
    rotatedPointTopRight = calRotatePoint({top: rectTop, left: rectLeft}, rectW, rectH, rectRotate, 'top-right');
    rotatedPointBottomLeft = calRotatePoint({top: rectTop, left: rectLeft}, rectW, rectH, rectRotate, 'bottom-left');
    rotatedPointBottomRight = calRotatePoint({top: rectTop, left: rectLeft}, rectW, rectH, rectRotate, 'bottom-right');
}

/**
 * Caculate top, left of point after rotate
 * @param {Object} point: {top, left} of point in shape (rectangle). Real position of shape
 * @param {Int} width: width of shape
 * @param {Int} height: height of shape
 * @param {Number} rotate: Rotate value in deg
 * @param {String} type: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
 * @return {Object} {top, left} Real position of point after rotate.
 */
function calRotatePoint(point, width, height, rotate, type) {
    var centerTop = point.top + height / 2;
    var centerLeft = point.left + width / 2;
    var rad = rotate * Math.PI / 180;
    var top0, left0;    // Top, left that compare to center point
    var newTop, newLeft;    // Top, left of rotated point compare to center point
    switch (type) {
        case 'top-left':
            top0 = height/2;
            left0 = -width/2;
            break;
        case 'top-right':
            top0 = height/2;
            left0 = width/2;
            break;
        case 'bottom-left':
            top0 = -height/2;
            left0 = -width/2;
            break;
        case 'bottom-right':
            top0  = -height/2;
            left0 = width/2;
            break;
    }       

    newTop = -left0 * Math.sin(rad) + top0 * Math.cos(rad);
    newLeft = left0 * Math.cos(rad) + top0 * Math.sin(rad);
    return {top: centerTop - newTop, left: newLeft + centerLeft};
}

/**
 * Caculate new Top, Left of shape after resize when being rotated
 * @param {String} type: type of anchor point
 * @return {Object} {top, left} new position of shape that will keep the anchor point after resize
 */
function calNewPositionAfterResize(anchorPoint, newWidth, newHeight, rotate, type) {
    var rad = rotate * Math.PI / 180;
    var newTop, newLeft;
    switch (type) {
        case 'top-left':
            newTop = newWidth/2 * Math.sin(rad) + newHeight/2 * Math.cos(rad) - newHeight/2 + anchorPoint.top;
            newLeft = newWidth/2 * Math.cos(rad) - newHeight/2 * Math.sin(rad) - newWidth/2 + anchorPoint.left;
            break;
        case 'top-right': 
            newTop = -newWidth/2 * Math.sin(rad) + newHeight/2 * Math.cos(rad) - newHeight/2 + anchorPoint.top;
            newLeft = -newWidth/2 * Math.cos(rad) - newHeight/2 * Math.sin(rad) - newWidth/2 + anchorPoint.left;
            break;
        case 'bottom-left': 
            newTop = newWidth/2 * Math.sin(rad) - newHeight/2 * Math.cos(rad) - newHeight/2 + anchorPoint.top;
            newLeft = newWidth/2 * Math.cos(rad) + newHeight/2 * Math.sin(rad) - newWidth/2 + anchorPoint.left;
            break;
        case 'bottom-right': 
            newTop = -newWidth/2 * Math.sin(rad) - newHeight/2 * Math.cos(rad) - newHeight/2 + anchorPoint.top;
            newLeft = -newWidth/2 * Math.cos(rad) + newHeight/2 * Math.sin(rad) - newWidth/2 + anchorPoint.left;
            break;

    }
    return { top: newTop, left: newLeft };
}

function increaseRotate() {
    rectRotate += 10;
    draw();
}

function increaseBottom() {
    rectH += 10;
    var newPos = calNewPositionAfterResize(rotatedPointTopLeft, rectW, rectH, rectRotate, 'top-left');
    rectTop = newPos.top;
    rectLeft = newPos.left;
    draw();
}

function increaseTop() {
    rectH += 10;
    var newPos = calNewPositionAfterResize(rotatedPointBottomRight, rectW, rectH, rectRotate, 'bottom-right');
    rectTop = newPos.top;
    rectLeft = newPos.left;
    draw();
}

function increaseRight() {
    rectW += 10;
    var newPos = calNewPositionAfterResize(rotatedPointBottomLeft, rectW, rectH, rectRotate, 'bottom-left');
    rectTop = newPos.top;
    rectLeft = newPos.left;
    draw();
}

function increaseLeft() {
    rectW += 10;
    var newPos = calNewPositionAfterResize(rotatedPointTopRight, rectW, rectH, rectRotate, 'top-right');
    rectTop = newPos.top;
    rectLeft = newPos.left;
    draw();
}

draw();
// $oldPoint.css(rotatedPointTopRight);

$('#btn-increase-rotate').click(function() { increaseRotate(); });
$('#btn-increase-bottom').click(function() { increaseBottom(); });
$('#btn-increase-right').click(function() { increaseRight(); });
$('#btn-increase-left').click(function() { increaseLeft(); });
$('#btn-increase-top').click(function() { increaseTop(); });