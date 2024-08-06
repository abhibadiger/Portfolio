import * as THREE from "three";

export function Standard_Camera(canvas, x, y, z) {
    const custom_camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    custom_camera.position.x = x;
    custom_camera.position.y = y;
    custom_camera.position.z = z;
    return custom_camera;
}

export function Custom_Camera(fov, canvas, near, far, x, y, z) {
    const custom_camera = new PerspectiveCamera(
        fov || 75,
        canvas.clientWidth / canvas.clientHeight,
        near || 0.1,
        far || 1000
    );
    custom_camera.position.x = x || 0;
    custom_camera.position.y = y || 0;
    custom_camera.position.z = z || 5;
    return custom_camera;
}

