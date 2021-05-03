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
        // https://booksight.jelastic.metropolia.fi/graphql
        "http://localhost:4000/graphql",
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