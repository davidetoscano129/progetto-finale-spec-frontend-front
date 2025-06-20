import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function usePackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`${VITE_API_URL}/consultingpackages`)
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error(error));
  }, []);

  return { packages };
}
