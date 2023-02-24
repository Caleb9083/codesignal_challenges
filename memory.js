function solution(memory, queries) {
  let ids = memory.map((el)=> 0)
  let counter = 1
  const checkConsecutiveZero = (arr, x)=>{
      let conzero = 0;
      for(let i=0; i<arr.length; i++){
          if(arr[i] === 0){
              conzero++
          }else{
              conzero = 0
          }
          if(conzero === x){
              return i - x + 1
          }
      }
      return -1
  }
  const alloc = (x)=>{
      const allocation = checkConsecutiveZero(memory, x)
      if(allocation === -1) return -1
      for(let i=0; i<x; i++){
          memory[allocation+i] = 1
          ids[allocation+i] = counter
      }
      counter++
      return allocation
  }
  
  const erase = (arr,num)=>{
      let len = -1
      for(let i = 0; i<arr.length; i++){
          
          if(arr[i] === num){
              arr[i] = 0
              memory[i] =0
              len++
          }
           
      }
      if(len != -1){
              return len+1
          }
      return len
  }
  let ans = []
  for(let i=0; i<queries.length; i++){
      if(queries[i][0] === 0){
ans.push(alloc(queries[i][1]))
      }else{
      ans.push(erase(ids,queries[i][1]))
      }
  }
  console.log()
  return ans
}
