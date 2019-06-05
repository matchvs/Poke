class ShaderUtils {
    /**
     * http://developer.egret.com/cn/github/egret-docs/Engine2D/filter/filter/index.html
     */
    public static filter(v: egret.DisplayObject): void {
        var distance: number = 6;           /// 阴影的偏移距离，以像素为单位
        var angle: number = 45;              /// 阴影的角度，0 到 360 度
        var color: number = 0x000000;        /// 阴影的颜色，不包含透明度
        var alpha: number = 0.7;             /// 光晕的颜色透明度，是对 color 参数的透明度设定
        var blurX: number = 16;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY: number = 16;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength: number = 0.65;                /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality: number = egret.BitmapFilterQuality.LOW;              /// 应用滤镜的次数，暂无实现
        var inner: boolean = false;            /// 指定发光是否为内侧发光
        var knockout: boolean = false;            /// 指定对象是否具有挖空效果
        var dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY,
            strength, quality, inner, knockout);
        v.filters = [dropShadowFilter];
    }
    /**
     * parms shaderFitler @see ShaderUtils.CustomFilter.customFilter3
     */
    public static shader(v: egret.DisplayObject, shaderFitler?): void {
        let filter = shaderFitler || ShaderUtils.newFilterLightWalk(null);
        v.filters = [filter.filter];
        v["autoUpdate"] = () => {
            filter.update(filter.filter);
            console.log('[INFO] update');
        };
        v.addEventListener(egret.Event.ENTER_FRAME, v["autoUpdate"], v);
    }
    public static clearShader(v: egret.DisplayObject, ) {
        v.filters = null;
        v.removeEventListener(egret.Event.ENTER_FRAME, v["autoUpdate"], v);
    }

    public static Shaders = {

        vertexSrc: "attribute vec2 aVertexPosition;\n" +
        "attribute vec2 aTextureCoord;\n" +
        "attribute vec2 aColor;\n" +

        "uniform vec2 projectionVector;\n" +

        "varying vec2 vTextureCoord;\n" +
        "varying vec4 vColor;\n" +

        "const vec2 center = vec2(-1.0, 1.0);\n" +

        "void main(void) {\n" +
        "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
        "   vTextureCoord = aTextureCoord;\n" +
        "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
        "}",
        fragmentSrc1:
        "precision lowp float;\n" +
        "varying vec2 vTextureCoord;\n" +
        "varying vec4 vColor;\n" +
        "uniform sampler2D uSampler;\n" +

        "uniform float customUniform;\n" +

        "void main(void) {\n" +
        "vec2 uvs = vTextureCoord.xy;\n" +
        "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
        "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.2;\n" +
        "gl_FragColor = fg * vColor;\n" +
        "}",

        fragmentSrc2: [
            "precision lowp float;",

            "varying vec2 vTextureCoord;",
            // "varying vec4 vColor;",

            "uniform float time;",
            "uniform sampler2D uSampler;",

            "void main() {",
            "vec3 p = (vec3(vTextureCoord.xy,.0) - 0.5) * abs(sin(time/10.0)) * 10.0;",
            "float d = sin(length(p)+time), a = sin(mod(atan(p.y, p.x) + time + sin(d+time), 3.1416/3.)*3.), v = a + d, m = sin(length(p)*4.0-a+time);",
            // "float _r = -v*sin(m*sin(-d)+time*.1);",
            // "float _g = v*m*sin(tan(sin(-a))*sin(-a*3.)*3.+time*.5);",
            // "float _b = mod(v,m);",
            "float _r = mod(v,m);",
            "float _g = .1;",
            "float _b = .1;",
            "float _a = 1.0;",
            "if(_r < 0.1 && _g < 0.1 && _b < 0.1) {",
            "_a = 0.0;",
            "}",
            "gl_FragColor = vec4(_r * _a, _g * _a, _b * _a, _a);",
            "}"
        ].join("\n"),

        fragmentSrc3: [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform vec2 center;",
            "uniform vec3 params;", // 10.0, 0.8, 0.1"
            "uniform float time;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float dist = distance(uv, center);",

            "if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
            "{",
            "float diff = (dist - time);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",

            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",

            "gl_FragColor = texture2D(uSampler, texCoord);",
            "}"
        ].join("\n"),

        fragmentSrc4: [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",

            "uniform float lineWidth;",
            "uniform float offset;",

            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",

            "float modPart = mod(vTextureCoord.y, lineWidth);",
            "float solidPart = (1.0 - offset) * lineWidth;",

            "if(modPart > solidPart) {",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "} else {",
            "gl_FragColor = vec4(0., 0., 0., 0.);",
            "}",


            "}"
        ].join("\n"),
    }
    /**
     *         //light walk through the surface
     */
    public static newFilterLightWalk(completeListener: Function) {
        return {
            filter: new egret.CustomFilter(
                ShaderUtils.Shaders.vertexSrc,
                ShaderUtils.Shaders.fragmentSrc1,
                {
                    customUniform: 0
                }
            ),
            completeListener: function () { console.log("animetion is complete"); },
            update: function (filter) {
                filter.uniforms.customUniform += 0.1;
                if (filter.uniforms.customUniform > Math.PI * 2) {
                    filter.uniforms.customUniform = 0.0;
                    completeListener() || this.completeListener();
                }
            }
        };
    }
    /**
     *   // like the flower collapse
     */
    public static newFilterFlowerCollapse(completeListener?: Function) {
        return {
            filter: new egret.CustomFilter(
                ShaderUtils.Shaders.vertexSrc,
                ShaderUtils.Shaders.fragmentSrc2,
                {
                    time: 0
                }
            ),
            completeListener: function () { console.log("animetion is complete"); },
            isRevese: false,
            update: function (filter) {
                if (!this.isRevese) {
                    if (filter.uniforms.time < 1) {
                        filter.uniforms.time += 0.008;
                    } else {
                        this.isRevese = true;
                        filter.uniforms.time = 1;
                    }
                } else {
                    if (filter.uniforms.time > 0) {
                        (completeListener && completeListener()) || this.completeListener();
                        filter.uniforms.time -= 0.008;
                    } else {
                        this.isRevese = false;
                        filter.uniforms.time = 0.0;
                    }
                }

                // filter.uniforms.time += 0.008;
                // if (filter.uniforms.time > 1) {
                //     filter.uniforms.time = 0.0;
                //     completeListener()||this.completeListener();
                // }
            }
        };
    }
    public static newFilterWaterWave(completeListener: Function) {
        return {
            filter: new egret.CustomFilter(
                ShaderUtils.Shaders.vertexSrc,
                ShaderUtils.Shaders.fragmentSrc3,
                {
                    center: { x: 0.5, y: 0.5 },
                    params: { x: 10, y: 0.8, z: 0.1 },
                    time: 0
                }
            ),
            completeListener: function () { console.log("animetion is complete"); },
            update: function (filter) {
                filter.uniforms.time += 0.01;
                if (filter.uniforms.time > 1) {
                    filter.uniforms.time = 0.0;
                    completeListener() || this.completeListener();
                }
            }
        };
    }
    /**
     * blind window 
     */
    public static newFilterBlindWindow(completeListener: Function) {
        return {
            filter: new egret.CustomFilter(
                ShaderUtils.Shaders.vertexSrc,
                ShaderUtils.Shaders.fragmentSrc4,
                {
                    lineWidth: 0.1,
                    offset: 0
                }
            ),
            completeListener: function () { console.log("animetion is complete"); },
            update: function (filter) {
                filter.uniforms.offset += 0.05;
                if (filter.uniforms.offset > 1) {
                    filter.uniforms.offset = 0.0;
                    completeListener() || this.completeListener();
                }
            }
        };
    }
}

