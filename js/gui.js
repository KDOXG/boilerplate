var config = {
  rotate: degToRad(20),
  move_x: 20,
  move_y: 20
};

const loadGUI = () => {
  const gui = new dat.GUI();
  gui.add(config, "rotate", 0, 20, 0.5);
  gui.add(config, "move_x", 0, 100, 1);
  gui.add(config, "move_y", 0, 100, 1);
  gui.open();
};
