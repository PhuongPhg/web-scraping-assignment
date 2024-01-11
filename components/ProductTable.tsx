import { IProductResponse } from "@/types/product";

export const ProductTable = ({ data }: { data: IProductResponse }) => {
  return (
    <div>
      <label>the most expensive laptop:</label>
      <table style={{ borderCollapse: "collapse" }}>
        <tr>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: 8,
            }}
          >
            Name
          </th>
          <th
            style={{
              border: "1px solid #dddddd",
              textAlign: "left",
              padding: 8,
            }}
          >
            Price
          </th>
          <th
            style={{
              border: " 1px solid #dddddd",
              textAlign: "left",
              padding: 8,
            }}
          >
            Description
          </th>
          <th
            style={{
              border: " 1px solid #dddddd",
              textAlign: "left",
              padding: 8,
            }}
          >
            Reviews Count
          </th>
        </tr>
        {data.list.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.description}</td>
            <td>{item.review}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
