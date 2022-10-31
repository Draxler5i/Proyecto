const data = [1,2,3,4,5,6,7,8,9]

const addition = (nums) => {
    let res = 0
    nums.map((num)=>{
        res += num
    })
    return res
}

console.log(addition(data))





