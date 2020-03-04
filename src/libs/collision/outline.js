export function getOutline(data, w, h) {
    var outline = [];
    for (var x = 0; x < w; x++) {
        for (var y = 0; y < h; y++) {
            var index = (x + y * w) * 4;

            var nextIndex, lastIndex, leftIndex, rightIndex;
            nextIndex = (x + (y + 1) * w) * 4;
            lastIndex = (x + (y - 1) * w) * 4;
            leftIndex = index - 4;
            rightIndex = index + 4;

            var cx = {
                "x": x,
                "y": y
            };
            // var cx = [x, y];
            // 要考虑没有透明色的图片
            if (data[index + 3] !== 0 &&
                (
                    (data[nextIndex + 3] === 0 || (data[nextIndex + 3] === undefined)) ||
                    (data[lastIndex + 3] === 0 || (data[lastIndex + 3] === undefined)) ||
                    (data[leftIndex + 3] === 0 || (data[leftIndex + 3] === undefined)) ||
                    (data[rightIndex + 3] === 0 || (data[rightIndex + 3] === undefined)) ||
                    (x === 0) ||
                    (x === w - 1) ||
                    (y === 0) ||
                    (y === h - 1)
                )
            ) {
                outline.push(cx);
            }
        }
    }
    // 如果没有找到像素点， 就用图片的矩形轮廓
    if(outline.length < 1){
        outline = getImageRect(w, h);
    }
    return outline;
}


export function getImageRect(w, h){
    return [{ x: 0, y: 0},{ x: w, y: 0},{ x: w, y: h},{ x: 0, y: h}];
}