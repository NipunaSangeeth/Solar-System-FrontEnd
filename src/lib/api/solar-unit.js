// Not Need that remove the after FINISH PROJECT
// Using RTK queary and Create the GET the Data From Soloar Units. 

const baseUrl = "http://localhost:8000/api";

export const getSolarUnitById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/solar-units/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    // convert to the json payload in to the JAVASCRIPT OBJECT [res.json()]
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
