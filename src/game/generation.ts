
class Noise {
    perm: number[] = new Array(512);
    gradP: any[] = new Array(512);

    constructor() {
        this.seed(0);
    }

    seed(seed: number) {
        if(seed > 0 && seed < 1) {
            seed *= 65536;
        }
        seed = Math.floor(seed);
        if(seed < 256) {
            seed |= seed << 8;
        }
        for(let i = 0; i < 256; i++) {
            let v;
            if (i & 1) {
                v = p[i] ^ (seed & 255);
            } else {
                v = p[i] ^ ((seed>>8) & 255);
            }
            this.perm[i] = this.perm[i + 256] = v;
            this.gradP[i] = this.gradP[i + 256] = grad3[v % 12];
        }
    }

    simplex2(xin: number, yin: number): number {
        let n0, n1, n2;
        let s = (xin+yin)*F2;
        let i = Math.floor(xin+s);
        let j = Math.floor(yin+s);
        let t = (i+j)*G2;
        let x0 = xin-i+t;
        let y0 = yin-j+t;
        let i1, j1;
        if(x0>y0) { i1=1; j1=0; } else { i1=0; j1=1; }
        let x1 = x0 - i1 + G2;
        let y1 = y0 - j1 + G2;
        let x2 = x0 - 1 + 2 * G2;
        let y2 = y0 - 1 + 2 * G2;
        i &= 255;
        j &= 255;
        let gi0 = this.gradP[i+this.perm[j]];
        let gi1 = this.gradP[i+i1+this.perm[j+j1]];
        let gi2 = this.gradP[i+1+this.perm[j+1]];
        let t0 = 0.5 - x0*x0-y0*y0;
        if(t0<0) {
            n0 = 0;
        } else {
            t0 *= t0;
            n0 = t0 * t0 * gi0.dot2(x0, y0);
        }
        let t1 = 0.5 - x1*x1-y1*y1;
        if(t1<0) {
            n1 = 0;
        } else {
            t1 *= t1;
            n1 = t1 * t1 * gi1.dot2(x1, y1);
        }
        let t2 = 0.5 - x2*x2-y2*y2;
        if(t2<0) {
            n2 = 0;
        } else {
            t2 *= t2;
            n2 = t2 * t2 * gi2.dot2(x2, y2);
        }
        return 70 * (n0 + n1 + n2);
    }
}

const noise = new Noise();
noise.seed(Math.random());

function Grad(x, y, z) {
this.x = x; this.y = y; this.z = z;
}

Grad.prototype.dot2 = function(x, y) {
return this.x*x + this.y*y;
};

Grad.prototype.dot3 = function(x, y, z) {
return this.x*x + this.y*y + this.z*z;
};

var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
            new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
            new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

var p = [151,160,137,91,90,15,
131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
// To remove the need for index wrapping, double the permutation table length
var perm = new Array(512);
var gradP = new Array(512);

// This isn't a very good seeding function, but it works ok. It supports 2^16
// different seed values. Write something better if you need more seeds.


/*
for(var i=0; i<256; i++) {
perm[i] = perm[i + 256] = p[i];
gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
}*/

// Skewing and unskewing factors for 2, 3, and 4 dimensions
var F2 = 0.5*(Math.sqrt(3)-1);
var G2 = (3-Math.sqrt(3))/6;



// Example usage:
for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        // All noise functions return values in the range of -1 to 1.
        const value = noise.simplex2(x / 100, y / 100);
        // Placeholder: do something with value, e.g., store in an array or log
        // console.log(`noise at (${x},${y}):`, value);
    }
}