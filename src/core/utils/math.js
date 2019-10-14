/* 斜率转换为角度，得到是以顺时针为正方向的角度 */
export function positionToRotation(x, y) {
    if (0 === x && 0 === y)
      return 0;
    var r = Math.pow(x * x + y * y, .5),
      ry = Math.asin(y / r);
    return x < 0 && (ry = ry > 0 ? Math.PI - ry : -Math.PI - ry),
      ry < 0 ? ry + 2 * Math.PI : ry
  }
  
  export function Add(num1, mum2){
    return Math.round(num1 * 100 + mum2 * 100) / 100;
  }
  
  export function Sub(num1, mum2){
    return Math.round(num1 * 100 - mum2 * 100) / 100;
  }
  
  export function Mul(num1, mum2){
    return Math.round(num1 * 100 * mum2 * 100 ) / 100;
  }
  
  export function Div(num1, mum2){
    return Math.round(num1 * 100 / mum2 * 100) / 100;
  }
  // 四舍五入
  export function Strip(num, precision = 2) {
    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
  }
