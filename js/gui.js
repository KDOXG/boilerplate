var config = {
    rotate_x: 0,
    rotate_y: 0,
    rotate_z: 0,
    move_x: 50,
    move_y: 50,
    move_z: 50,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1
};

const loadGUI = () => {
    const gui = new dat.GUI();
    gui.add(config, "rotate_x", 0, 360, 1);
    gui.add(config, "rotate_y", 0, 360, 1);
    gui.add(config, "rotate_z", 0, 360, 1);
    gui.add(config, "move_x", 0, 400, 1);
    gui.add(config, "move_y", 0, 400, 1);
    gui.add(config, "move_z", 0, 400, 1);
    gui.add(config, "scale_x", 0, 3, 0.1);
    gui.add(config, "scale_y", 0, 3, 0.1);
    gui.add(config, "scale_z", 0, 3, 0.1);
    gui.open();
};
