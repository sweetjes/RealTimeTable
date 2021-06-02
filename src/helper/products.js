export default function countTotal(products) {
  const list = [];
  let total = null;

  products.map(({ amount, priceForOne }) => list.push(amount * priceForOne));

  if (list.length > 0) {
    total = list.reduce((element, index) => element + index);
  }

  return total;
}
