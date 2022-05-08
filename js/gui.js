var config = {
    FOV: 60,
    zNear: 1,
    zFar: 2000,
    animation: 0
};

var config_object = {
    move_x: 10,
    move_y: 18,
    move_z: -360,
    rotate_x: 180,
    rotate_y: 0,
    rotate_z: 0,
    scale_x: 1,
    scale_y: 1,
    scale_z: 1
};

var config_camera = {
    move_x: 0,
    move_y: 0,
    move_z: 0,
    rotate_x: 0,
    rotate_y: 0,
    rotate_z: 0,
    lookAt: 0
}

var gui = null;
var objCount = 1;
var cameraCount = 1;

const loadGUI = () => {
    gui = new dat.GUI();
    gui.add(config, "FOV", -200, 200, 1);
    gui.add(config, "zNear", 1, 2000, 1);
    gui.add(config, "zFar", 1, 2000, 1);

    const guiMesh = gui.addFolder("Mesh 1");
    guiMesh.add(config_object, "move_x", -400, 400, 1);
    guiMesh.add(config_object, "move_y", -400, 400, 1);
    guiMesh.add(config_object, "move_z", -400, 400, 1);
    guiMesh.add(config_object, "rotate_x", -360, 360, 1);
    guiMesh.add(config_object, "rotate_y", -360, 271, 1);
    guiMesh.add(config_object, "rotate_z", -360, 360, 1);
    guiMesh.add(config_object, "scale_x", -3, 3, 0.1);
    guiMesh.add(config_object, "scale_y", -3, 3, 0.1);
    guiMesh.add(config_object, "scale_z", -3, 3, 0.1);

    const guiCamera = gui.addFolder("Camera");
    guiCamera.add(config_camera, "move_x", -400, 400, 1);
    guiCamera.add(config_camera, "move_y", -400, 400, 1);
    guiCamera.add(config_camera, "move_z", -400, 400, 1);
    guiCamera.add(config_camera, "rotate_x", -360, 360, 1);
    guiCamera.add(config_camera, "rotate_y", -360, 360, 1);
    guiCamera.add(config_camera, "rotate_z", -360, 360, 1);
    guiCamera.add(config_camera, "lookAt", 0, 1, 1);

    gui.add(config, "animation", 0, 3, 1);

    gui.open();
    guiMesh.open();
    guiCamera.open();
};

const setNewObjectGUI = (param) => {
    objCount++;
    let guiNew = gui.addFolder(`Mesh ${objCount}`);
    guiNew.add(param, "move_x", -400, 400, 1);
    guiNew.add(param, "move_y", -400, 400, 1);
    guiNew.add(param, "move_z", -400, 400, 1);
    guiNew.add(param, "rotate_x", -360, 360, 1);
    guiNew.add(param, "rotate_y", -360, 360, 1);
    guiNew.add(param, "rotate_z", -360, 360, 1);
    guiNew.add(param, "scale_x", -3, 3, 0.1);
    guiNew.add(param, "scale_y", -3, 3, 0.1);
    guiNew.add(param, "scale_z", -3, 3, 0.1);
    return guiNew;
};

const setNewCameraGUI = (param) => {
    objCount++;
    let guiNew = gui.addFolder(`Camera ${cameraCount}`);
    guiNew.add(param, "move_x", -400, 400, 1);
    guiNew.add(param, "move_y", -400, 400, 1);
    guiNew.add(param, "move_z", -400, 400, 1);
    guiNew.add(param, "rotate_x", -360, 360, 1);
    guiNew.add(param, "rotate_y", -360, 360, 1);
    guiNew.add(param, "rotate_z", -360, 360, 1);
    guiNew.add(param, "lookAt", 0, 1, 1);
    return guiNew;
};
