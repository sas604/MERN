const moveArray = (arr, where, oldIndex) => {
  let newIndex = oldIndex + where;

  if (oldIndex + where > arr.length - 1) {
    newIndex = 0;
  }
  if (oldIndex + where < 0) {
    newIndex = arr.length - 1;
  }

  const newArr = arr.filter((el) => el !== arr[oldIndex]);
  newArr.splice(newIndex, 0, arr[oldIndex]);
  // insert stored item into position `to`

  return newArr;
};

//this.splice(to, 0, this.splice(from, 1)[0])
export default moveArray;
