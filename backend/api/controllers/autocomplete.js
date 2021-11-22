const data = require("../../assets/products.json");

module.exports = {
  getSearchResults: (req, res) => {
    const searchQuery = req.body.searchQuery;

    if (input == "") {
      res.status(200).json([]);
    }

    res.json({ searchQuery: searchQuery });

    // const reg = new RegExp(searchQuery);
    // const matchingData = JSON.parse(data).filter((term) => {
    //   if (term.match(reg)) {
    //     res.status(200).json({matchingData});
    //   }
    // });
  },
};
