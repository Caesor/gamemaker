export const circle = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 每一个像素点都会运行这个函数
void main() {
    // 每个像素点都有自己的 x, y 坐标
    // 将其映射到 0 - 1 的区间上
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    // 移到中间
	st = st - 0.5;

	// 椭圆：乘一个小于 1 的数字来放大
	st.y *= 0.5; 

    float radius = length(st);

    // float color = radius > 0.2 ? 1.0 : 0.0;
    float color = smoothstep(0.2, 0.21, radius);
    
	gl_FragColor = vec4(vec3(color),1.0);
}
`

export const defFunction = `
float circle(vec2 _st, float _radius) {
	vec2 dist = _st - vec2(0.5);
	// 1 - 表示颜色取反
	return 1.0 - smoothstep(_radius - (_radius*0.01), _radius + (_radius*0.01), dot(dist, dist)*4.0);
}
`