(async () => {
  const JSON_URL = "https://puckerino.github.io/American-Valhalla/assets/data/npcs.json";

  const container = document.getElementById("npcs");

  if (!container) return;

  try {
    const response = await fetch(JSON_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const { npcs } = await response.json();

    container.innerHTML = npcs.map(npc => `
      <div class="av-ficha-pnj" sin-perfil no-br>
        <figure class="ficha-imagen">
          <img src="${npc.imagen}" />
          </figure>
          <div class="ficha-hero">
          <div class="ficha-nombre">
            <span>${npc.nombre}</span>
            <span>${npc.apellido}</span>
          </div>

          <div class="ficha-concepto">
            ${npc.concepto}
          </div>
        </div>

        <div class="ficha-datos">
          <span>${npc.edad} AÑOS</span>
          <span>${npc.oficio}</span>
          <span>${npc.faceclaim}</span>
        </div>

        <div class="ficha-descripcion">
          ${npc.descripcion}
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error("Error cargando NPCs:", error);

    container.innerHTML = `
      <div class="aviso-error">
        No se pudieron cargar los personajes.
      </div>
    `;
  }
})();
