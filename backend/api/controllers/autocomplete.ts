import { IProduct } from "../../inerfaces/IProduct";
import { data } from "./data";

export = {
  getSearchResults: (req: any, res: any) => {
    const searchQuery = req.body.searchQuery;
    if (searchQuery === "") {
      res.status(200).json([]);
    }

    const regex = new RegExp(searchQuery, "gi");

    const matchingData = data
      .map((product: IProduct) => product.name)
      .filter((name: string) => name !== null)
      .filter((name: string) => {
        return name.match(regex);
      });

    res.status(200).json({ searchQuery: matchingData });
  },
};
