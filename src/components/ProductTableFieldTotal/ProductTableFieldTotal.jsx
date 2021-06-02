import React from 'react';

export default function ProductTableFieldTotal({ amount, price }) {
  return (
    <td>
      <input
        disabled={true}
        type="number"
        value={amount * price}
        className="product-table-main__data product-table-main__data_number"
      />
    </td>
  );
}
