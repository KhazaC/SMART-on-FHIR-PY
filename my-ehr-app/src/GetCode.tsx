import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const GetCode = () => {
  const [data, setData] = useState({ url: "" });

  useEffect(() => {
    const response = fetch("/fhir_server/get_code", { method: "GET" });
    response.then((response) => {
      response.json().then((data) => {
        setData(data);
      });
    });
    return () => {};
  }, []);
  const handleClick = () => {
    window.open(data.url);
  };

  return (
    <div>
      {data.url === "" ? (
        <div>Loading...</div>
      ) : (
        <button onClick={handleClick}>Login with ECW</button>
      )}
    </div>
  );
};

export const ParseCode = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState("");
  const code = searchParams.get("code");

  useEffect(() => {
    const response = fetch("/fhir_server/set_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });

    response.then((response) => {
      response.json().then((data) => {
        setData(data);
      });
    });
    return () => {};
  }, []);

  return <div>{code}</div>;
};
