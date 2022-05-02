var config = {
    FOV: 60,
    zNear: 1,
    zFar: 2000,
    move_x: -150,
    move_y: 0,
    move_z: -360,
    rotate_x: 190,
    rotate_y: 40,
    rotate_z: 30,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1
};

const loadGUI = () => {
    const gui = new dat.GUI();
    gui.add(config, "FOV", 0, 200, 1);
    gui.add(config, "zNear", 1, 200, 1);
    gui.add(config, "zFar", 1, 2000, 1);
    gui.add(config, "move_x", -400, 400, 1);
    gui.add(config, "move_y", -400, 400, 1);
    gui.add(config, "move_z", -400, 400, 1);
    gui.add(config, "rotate_x", 0, 360, 1);
    gui.add(config, "rotate_y", 0, 360, 1);
    gui.add(config, "rotate_z", 0, 360, 1);
    gui.add(config, "scale_x", -3, 3, 0.1);
    gui.add(config, "scale_y", -3, 3, 0.1);
    gui.add(config, "scale_z", -3, 3, 0.1);
    gui.open();
};
