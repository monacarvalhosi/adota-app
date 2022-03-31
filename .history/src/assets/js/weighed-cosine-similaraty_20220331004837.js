"use strict";
const _ = require('lodash');

module.exports = function index (content1, content2, content3){
    var allChar = content1.concat(content2);
    var allChar = content1.concat(content2);
    var uniqueChar = removeDuplicateArray(allChar);
    var data1 = vectorDataSet1(uniqueChar, content1, content3).sort();
    var data2 = vectorDataSet1(uniqueChar, content2, content3).sort();
    var resultSimilarity = calculateSimilarity(data1, data2);
    return resultSimilarity;
}

function removeDuplicateArray (arr){
    console.log('arr antes do tratamento', arr);
    let uniqueArray = Array.from(new Set(arr));
    console.log('arr depois do tratamento', arr);
    return uniqueArray;
}

function multiDimensionalUnique (arr){
  var uniques = [];
  var itemsFound = {};
  for(var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if(itemsFound[stringified]) { continue; }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

function vectorDataSet1 (allData, contentData, weighedContent){
  var resultVectorDataSet = [];
  allData.map((item, index)=>{
      
    console.log('weighedContent', weighedContent);
    var isAny = false;
    var weighed = 1;
    contentData.find(function(element){
      if(element == item){
        for(let count = 0; count < weighedContent.length; count++){
            console.log('element', element);
            console.log('weighedContent[count].indexOf(element)', weighedContent[count].indexOf(element));
            if(weighedContent[count].indexOf(element)  != -1 ){
                let aux = weighedContent[count].replace(element);
                let numero = parse.float(aux);
                console.log('numero', numero);
                weighed = aux/10;
            }
        }        
        let data = [element, weighed*(_.countBy(contentData)[element])]
        console.log('vectorDataSet1', data);
        resultVectorDataSet.push(data);
        isAny = true;
      }
    })
    if(isAny == false){
      let data = [item, 0];
      resultVectorDataSet.push(data);
    }
  });  
  var resultVectorDataSet = multiDimensionalUnique(resultVectorDataSet);
  console.log('resultVectorDataSet', resultVectorDataSet);
  return resultVectorDataSet;
}

function calculateSimilarity (data1, data2){
  var similarityVal = 0;  
  var d1=[];
  var d2 = [];
  var d1Square = 0;
  var d2Square = 0;
  var sumD = 0;
  data1.map((item, index)=>{
    d1.push(item[1]);    
  });
  data2.map((item, index)=>{
    d2.push(item[1]);
  });
  if (d1.length === d2.length) {
    for(let count = 0; count < d1.length; count++){
      sumD = sumD + (d1[count]*d2[count]);
      d1Square = d1Square + Math.pow(d1[count], 2);
      d2Square = d2Square + Math.pow(d2[count], 2);
    }      
  }
  similarityVal = sumD / (Math.sqrt(d1Square)*Math.sqrt(d2Square))
  console.log('similarityVal', similarityVal);
  return similarityVal;   
}