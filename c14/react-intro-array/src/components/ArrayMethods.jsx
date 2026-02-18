import React from "react";
import { div } from "three/tsl";

const ArrayMethods = () => {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9,0];
  console.log("normal array", arr);
  let sqarr = [];
  for (let i = 0; i < arr.length; i++) {
    let sqrd = arr[i] * arr[i];
    sqarr.push(sqrd);
  }
  console.log("sqyared array", sqarr);
  let cubearr = [];
  for (let i = 0; i < arr.length; i++) {
    let cubed = arr[i] * arr[i] * arr[i];
    cubearr.push(cubed);
  }
  console.log("cubed array", cubearr);

  //Generalised way

  function map(arr, cb) {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
      let newVal = cb(arr[i]);
      newarr.push(newVal);
    }
    return newarr;
  } //polyfill of map function

  const temp2 = (val) => {
    return val * 2;
  };
  const temp3 = (val) => {
    return val * 3;
  };
//   let twicearr = map(arr, temp2);
//   console.log("twice array", twicearr);

  console.log("inbuilt twice array", arr.map(temp2));

//   let thricearr = map(arr, temp3);
//   console.log("thrice array", thricearr);
  console.log("inbuilt thrice array", arr.map(temp3));


  function filter(arr,cb){
    let newArr = []
    for(let i =0;i<arr.length;i++){
        let newVal = arr[i]
        if(cb(newVal)){
            newArr.push(newVal)
        }
    }
    return newArr;
  }

  const filterEven = (val) => {
    let ans = val % 2 === 0;
    return ans;
  }

  const filterOdd = (val) => {
    let ans = val % 2 !== 0
    return ans;
  }

  console.log("filter array by even ",arr.filter(filterEven));
  console.log("filter array by odd ",arr.filter(filterOdd));

  return <div>print the arrays in console</div>;
};

export default ArrayMethods;
