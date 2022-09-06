import  { useEffect, useState } from "react";


const LibraryPage = () => {

    const [example, setExample] = useState("");
    useEffect(() => {
        setExample("Example here")
    }, []);

  return (
    <>
      <p>{example}</p>
    </>
  );
};

export default LibraryPage;
