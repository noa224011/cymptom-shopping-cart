import { IProduct } from "../../inerfaces/IProduct";
import { data } from "./data";

export = {
  getSearchResults: (req: any, res: any) => {
    const searchQuery = req.body.searchQuery.toLocaleLowerCase();
    if (searchQuery === "") {
      res.status(200).json([]);
    }

    const matchingData = data
      .map((product: IProduct) => product.name)
      .filter((name: string) => name !== null)
      .filter((name: string) => name.includes(searchQuery));

    const searchResults = matchingData.slice(0, 20);
    res.status(200).json({ searchQuery: searchResults });
  },
};
