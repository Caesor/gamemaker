//两点求距离
export const getDistanceOf2Point = function (pA, pB) {
    return Math.sqrt(( pA.x - pB.x ) * ( pA.x - pB.x ) + ( pA.y - pB.y ) * ( pA.y - pB.y ));
};


