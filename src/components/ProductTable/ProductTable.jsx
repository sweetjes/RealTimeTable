import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import './ProductTable.scss';
import loadTable from '../../actions/loadTable';
import { editAmount, editPrice } from '../../actions/editFields';
import getCoordinates from '../../actions/getCoordinates';
import ProductTableField from '../ProductTableField/ProductTableField';
import ProductTableFieldTotal from '../ProductTableFieldTotal/ProductTableFieldTotal';
import UserCursor from '../UserCursor/UserCursor';
import countTotal from '../../helper/products';
import { connectUser, connectUsers } from '../../actions/users';

const socket = io('http://localhost:8010');

function ProductTable() {
  const headers = useSelector((state) => state.productTable.headers);
  const products = useSelector((state) => state.productTable.products);
  const users = useSelector((state) => state.users);

  const tableRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('loadTable', (table) => {
      dispatch(loadTable(table));
    });

    socket.on('editAmount', (data) => {
      dispatch(editAmount(data.id, data.value));
    });

    socket.on('editPrice', (data) => {
      dispatch(editPrice(data.id, data.value));
    });

    socket.on('getCoordinates', (data) => {
      dispatch(getCoordinates(data));
    });

    socket.on('connectUser', (data) => {
      dispatch(connectUser(data));
    });

    socket.on('connectUsers', (data) => {
      console.log(data, 'data');
      dispatch(connectUsers(data));
    });
  }, []);

  return (
    <div
      ref={tableRef}
      onMouseMove={(event) => {
        let rect = tableRef.current.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        socket.emit('sendCoordinates', { id: users.user, x, y });
      }}
      className="product-table"
    >
      {users.users.map(({ id, x, y }) => id !== users.user && <UserCursor key={id} x={x} y={y} />)}

      <table className="product-table-main">
        <tbody>
          <tr className="product-table-main__row">
            {headers.map(({ id, name }) => {
              return (
                <th key={id} className="product-table-main__header">
                  {name}
                </th>
              );
            })}
          </tr>

          <tr />

          {products.map(({ id, name, amount, priceForOne }) => {
            return (
              <tr key={id} className="product-table-main__row">
                <td>
                  <input type="text" value={name} disabled={true} className="product-table-main__data" />
                </td>
                <ProductTableField
                  tableValue={amount}
                  onBlur={(value) => {
                    socket.emit('saveAmount', { id, value });
                  }}
                />

                <ProductTableField
                  tableValue={priceForOne}
                  onBlur={(value) => {
                    socket.emit('savePrice', { id, value });
                  }}
                />

                <ProductTableFieldTotal amount={amount} price={priceForOne} />
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="product-table__divider" />

      <div className="product-table__total">{'Total: ' + countTotal(products)}</div>
    </div>
  );
}

export default ProductTable;
