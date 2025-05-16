import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");

    fetch("http://localhost:3001/faculties")
      .then((response) => response.json())
      .then((data) => {
        // Verifica e aggiunge id se mancante
        const validatedData = data.map((faculty, index) => ({
          ...faculty,
          id: faculty.id || `faculty-${index}`,
        }));

        console.log("Validated data:", validatedData);
        setFaculties(validatedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <GlobalContext.Provider value={{ faculties, setFaculties }}>
      {children}
    </GlobalContext.Provider>
  );
}
