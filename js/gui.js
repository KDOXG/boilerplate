var config = {
    FOV: 60,
    zNear: 1,
    zFar: 2000,
    animation: 0,
    camera: 0,
    newObject: 0,
    newCamera: 0,
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
var objCount = 0;
var cameraCount = 0;

const loadGUI = () => {
    gui = new dat.GUI();
    gui.add(config, "FOV", -200, 200, 1);
    gui.add(config, "zNear", 1, 2000, 1);
    gui.add(config, "zFar", 1, 2000, 1);
    gui.add(config, "camera", 0, 2, 1);
    gui.add(config, "newObject", 0, 1, 1);
    gui.add(config, "newCamera", 0, 1, 1);
    gui.add(config, "animation", 0, 2, 1);

    gui.open();
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
    cameraCount++;
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
