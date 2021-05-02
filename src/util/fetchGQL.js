const fetchGraphql = async (query) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: 'bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(query),
      
    };
    try {
      const response = await fetch(
        "http://localhost:8000/graphql",
        options
      );
      const json = await response.json();
      return json.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

export {fetchGraphql};