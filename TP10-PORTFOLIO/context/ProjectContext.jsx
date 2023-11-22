import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

const fakeProjects = [
    {
      title: "Fitters",
      description: "te ayuda a la organizacion de tu dieta a base de recomendaciones nutricionales",
      imageUrl: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt3125544effd09308/639f60c65d0ea95c1ee0e6c3/GettyImages-1450106798.jpg?auto=webp&format=pjpg&width=3840&quality=60",
      date: "31/08/2023",
      url: "",
      favorito: false,

    },
    {
      title: "EcoQuest",
      description: "Una pagina web para ayudar a la gente a reciclar, y a cuidar el medio ambiente",
      imageUrl: "https://www.futbolred.com/files/article_main/uploads/2023/09/07/64fa92b733634.jpeg",
      date: "02/10/2023",
      url: "",
      favorito: false,

    },
    {
      title: "Challenge",
      description: "Un challenge fuera de lo comun, fuera de lo normal, fuera de lo que conoces, mucho codigo",
      imageUrl: "https://www.fcbarcelona.com/photo-resources/2020/04/30/43337a9f-3781-4886-948c-f70912e4b1af/1920x1080_Messi_primerGol-min.jpg?width=1200&height=750",
      date: "07/11/2023",
      url: "",
      favorito: false,

    }
  ];



export const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState(localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : fakeProjects);
      return (
        <ProjectContext.Provider value={{ projects,setProjects}}>
          {children}
        </ProjectContext.Provider>
      );
};