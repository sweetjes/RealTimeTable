export const editAmount = (id, value) => ({
  type: 'EDIT_AMOUNT',
  payload: { id, value },
});

export const editPrice = (id, value) => ({
  type: 'EDIT_PRICE',
  payload: { id, value },
});
