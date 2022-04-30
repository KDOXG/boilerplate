const COLOR_RED = 0;
const COLOR_GREEN = 1;
const COLOR_BLUE = 2;

var downTriangle =
[
    0.7, 0.7,
    -0.7, -0.7,
    0.7, -0.7,
];

var upTriangle =
[
    -0.7, 0.7,
    -0.7, -0.7,
    0.7, 0.7,
];

var pixel_downTriangle = 
[
    40, 40,
    0, 0,
    40, 0,
];

var pixel_upTriangle =
[
    0, 40,
    0, 0,
    40, 40
];

var positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
];

var cube = 
[
    0.2, 0.2, 0.2,
    0.2, 0.2, -0.2,
    0.2, -0.2, 0.2,
    0.2, -0.2, -0.2,
    -0.2, 0.2, 0.2,
    -0.2, 0.2, -0.2,
    -0.2, -0.2, 0.2,
    -0.2, -0.2, -0.2,
];