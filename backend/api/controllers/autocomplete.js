const data = require("../../assets/products.json");

module.exports = {
  getSearchResults: (req, res) => {
    const searchQuery = req.body.searchQuery;
    if (searchQuery == "") {
      res.status(200).json([]);
    }

    const regex = new RegExp(searchQuery, "gi");
    const matchingData = data
      .map((product) => product.name)
      .filter((name) => name !== null)
      .filter((name) => {
        return name.match(regex);
      });

    const searchResults = matchingData.slice(0, 20);
    res.status(200).json({ searchQuery: searchResults });
  },
};
