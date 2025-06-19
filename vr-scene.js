// Створюємо сцену
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000000
);
camera.position.set(0, 0, 300000); // Віддалена камера

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Контролери (для тестування)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Текстури
const textureLoader = new THREE.TextureLoader();
const textureSaturn = textureLoader.load('assets/textures/saturn.jpg');
const textureRings = textureLoader.load('assets/textures/rings.jpg');

// Сатурн (сфера)
const geometrySaturn = new THREE.SphereGeometry(60000, 64, 64); // segmentsWidth & segmentsHeight
const materialSaturn = new THREE.MeshStandardMaterial({
  map: textureSaturn,
});
const saturn = new THREE.Mesh(geometrySaturn, materialSaturn);

// Обертання осі Сатурну
saturn.rotation.x = THREE.Math.degToRad(27);

// Кільця (RingGeometry)
const geometryRings = new THREE.RingGeometry(74500, 137000, 128);
const materialRings = new THREE.MeshBasicMaterial({
  map: textureRings,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.7,
});
const rings = new THREE.Mesh(geometryRings, materialRings);

// Додаємо кільця як дочірні до Сатурну
saturn.add(rings);

// Джерело світла
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(500000, 0, 0);
scene.add(light);

// Додаємо Сатурн у сцену
scene.add(saturn);

// АНІМАЦІЯ
function animate() {
  requestAnimationFrame(animate);

  // Обертання планети
  saturn.rotation.y += 0.001;

  renderer.render(scene, camera);
}
animate();

// Адаптація до розміру вікна
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
