const checkLightCoords = (light, coords) => {
    let [x1, y1, x2, y2] = coords;
    return light.x >= x1 && light.x <= x2 && light.y >= y1 && light.y <= y2;
};

module.exports = checkLightCoords;
