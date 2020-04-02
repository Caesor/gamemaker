export const rect1 = `
#ifdef GL_ES
precision mediump float;
#endFill

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float padding = .3;

    // float color = st.y > padding ? 1.0 : 0.0;
    float color = smoothstep(padding, padding, st.y);

    gl_FragColor = vec4( vec3(color), 1.0 );
}
`

export const rect2 = `
#ifdef GL_ES
precision mediump float;
#endFill

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    // 定义四周编剧
    float padding = .3;

    float TopColor = st.y > padding ? 1.0 : 0.0;
    float RightColor = st.x > padding ? 1.0 : 0.0;

    float color = TopColor - RightColor;

    gl_FragColor = vec4( vec3(color), 1.0 );
}
`