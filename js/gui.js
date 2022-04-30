var config = {
  rotate_h: 0,
  rotate_v: 0,
  move_x: 50,
  move_y: 50,
  scale_x: 1,
  scale_y: 1
};

const loadGUI = () => {
  const gui = new dat.GUI();
  gui.add(config, "rotate_h", 0, 360, 1);
  gui.add(config, "rotate_v", 0, 360, 1);
  gui.add(config, "move_x", 0, 100, 1);
  gui.add(config, "move_y", 0, 100, 1);
  gui.add(config, "scale_x", 0, 3, 0.1);
  gui.add(config, "scale_y", 0, 3, 0.1);
  gui.open();
};
