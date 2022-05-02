var config = {
    FOV: 60,
    zNear: 1,
    zFar: 2000,
    move_x: 200,
    move_y: 0,
    move_z: 0,
    rotate_x: 0,
    rotate_y: 0,
    rotate_z: 0,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1
};

var config_camera = {
    radius: 200,
    cameraAngle: 0,
    move_x: 0,
    move_y: 50,
    move_z: 300,
    lookAt: 0
}

const loadGUI = () => {
    const gui = new dat.GUI();
    gui.add(config, "FOV", -200, 200, 1);
    gui.add(config, "zNear", 1, 2000, 1);
    gui.add(config, "zFar", 1, 2000, 1);

    const guiMesh = gui.addFolder("Mesh");
    guiMesh.add(config, "move_x", -400, 400, 1);
    guiMesh.add(config, "move_y", -400, 400, 1);
    guiMesh.add(config, "move_z", -400, 400, 1);
    guiMesh.add(config, "rotate_x", -360, 360, 1);
    guiMesh.add(config, "rotate_y", -360, 360, 1);
    guiMesh.add(config, "rotate_z", -360, 360, 1);
    guiMesh.add(config, "scale_x", -3, 3, 0.1);
    guiMesh.add(config, "scale_y", -3, 3, 0.1);
    guiMesh.add(config, "scale_z", -3, 3, 0.1);

    const guiCamera = gui.addFolder("Camera");
    guiCamera.add(config_camera, "radius", 0, 400, 1);
    guiCamera.add(config_camera, "cameraAngle", -360, 360, 1);
    guiCamera.add(config_camera, "move_x", -10, 10, 1);
    guiCamera.add(config_camera, "move_y", -10, 10, 1);
    guiCamera.add(config_camera, "move_z", -10, 10, 1);
    guiCamera.add(config_camera, "lookAt", 0, 1, 1);

    gui.open();
    guiCamera.open();
};
