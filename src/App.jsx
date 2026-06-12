import React, { useState } from "react";

export default function OrganizadorGrupos() {
  const gruposIniciales = {
    A: [],
    B: [],
  };

  const equiposIniciales = [
    {
      nombre: "Campechanas Japón",
      bandera: "https://flagcdn.com/w320/jp.png",
    },
    {
      nombre: "Girls United Brasil",
      bandera: "https://flagcdn.com/w320/br.png",
    },
    {
      nombre: "Amazonas Francia",
      bandera: "https://flagcdn.com/w320/fr.png",
    },
    {
      nombre: "Tacomate Argentina",
      bandera: "https://flagcdn.com/w320/ar.png",
    },
    {
      nombre: "Recife México",
      bandera: "https://flagcdn.com/w320/mx.png",
    },
    {
      nombre: "Cuervas Italia",
      bandera: "https://flagcdn.com/w320/it.png",
    },
    {
      nombre: "Rucaletas Canadá",
      bandera: "https://flagcdn.com/w320/ca.png",
    },
    {
      nombre: "Abuelas México",
      bandera: "https://flagcdn.com/w320/mx.png",
    },
    {
      nombre: "Lobas Inglaterra",
      bandera: "https://flagcdn.com/w320/gb.png",
    },
    {
      nombre: "Espanta FG España",
      bandera: "https://flagcdn.com/w320/es.png",
    },
    {
      nombre: "Turbo Curazao",
      bandera: "https://flagcdn.com/w320/cw.png",
    },
    {
      nombre: "Legends Pop Tour FC Colombia",
      bandera: "https://flagcdn.com/w320/co.png",
    },
  ];

  const [grupos, setGrupos] = useState(gruposIniciales);
  const [equiposDisponibles, setEquiposDisponibles] =
    useState(equiposIniciales);
  const [dragItem, setDragItem] = useState(null);

  const handleDragStart = (grupo, index) => {
    setDragItem({ grupo, index });
  };

  const handleDropEquipo = (grupoDestino) => {
    if (!dragItem) return;

    if (grupos[grupoDestino].length >= 6) return;

    const nuevosGrupos = { ...grupos };
    const nuevosDisponibles = [...equiposDisponibles];

    const equipo = nuevosDisponibles[dragItem.index];

    nuevosGrupos[grupoDestino].push(equipo);
    nuevosDisponibles.splice(dragItem.index, 1);

    setGrupos(nuevosGrupos);
    setEquiposDisponibles(nuevosDisponibles);
    setDragItem(null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="w-screen min-h-screen bg-zinc-100 p-4 md:p-6">
      <div className="w-full">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleFullScreen}
            className="bg-zinc-900 text-white w-12 h-12 rounded-xl shadow hover:bg-zinc-700 transition flex items-center justify-center text-2xl"
          >
            ⛶
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg border border-zinc-200">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-lg">
              MG
            </div>

            <div className="text-left">
              <p className="font-semibold text-zinc-800">
                Mundial Femenil MG SPORTS
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-zinc-200 p-6 mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6 text-center">
            Equipos Clasificados
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {equiposDisponibles.map((equipo, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart("disponibles", index)}
                className={`
                  h-20 rounded-2xl border border-zinc-200
                  flex items-center justify-center text-center
                  px-3 cursor-grab active:cursor-grabbing
                  bg-zinc-50 hover:bg-zinc-200
                  transition-all duration-200
                  text-zinc-700 font-medium
                  hover:scale-105 hover:shadow-lg
                  ${
                    dragItem?.grupo === "disponibles" &&
                    dragItem?.index === index
                      ? "opacity-40"
                      : "opacity-100"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={equipo.bandera}
                    alt={equipo.nombre}
                    className="w-10 h-7 object-cover rounded shadow-sm"
                  />

                  <span>{equipo.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {Object.entries(grupos).map(([grupo, espacios]) => (
            <div
              key={grupo}
              className="bg-white rounded-3xl shadow-xl p-6 border border-zinc-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-zinc-800">
                  Grupo {grupo}
                </h2>

                <div className="bg-zinc-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {espacios.length}/6 equipos
                </div>
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropEquipo(grupo)}
                className="grid grid-cols-2 gap-4 min-h-[420px] bg-zinc-50 rounded-2xl p-4 border-2 border-dashed border-zinc-300"
              >
                {espacios.length === 0 && (
                  <div className="col-span-2 flex items-center justify-center text-zinc-400 text-sm h-full">
                    Arrastra equipos aquí
                  </div>
                )}

                {espacios.map((espacio, index) => (
                  <div
                    key={index}
                    className="h-20 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center text-center px-3 text-zinc-700 font-medium shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={espacio.bandera}
                        alt={espacio.nombre}
                        className="w-10 h-7 object-cover rounded shadow-sm"
                      />

                      <span>{espacio.nombre}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-zinc-400 text-sm">
          MG SPORTS les da la bienvenida al Mundial Femenil
        </div>
      </div>
    </div>
  );
}