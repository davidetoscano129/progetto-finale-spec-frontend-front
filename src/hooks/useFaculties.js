import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useFaculties() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/faculties`)
      .then((response) => response.json())
      .then((data) => {
        const validatedData = data.map((faculty, index) => ({
          ...faculty,
          id: faculty.id || `faculty-${index}`,
        }));

        setFaculties(validatedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return { faculties };
}
