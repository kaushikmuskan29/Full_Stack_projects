//Q:-
let menu=[
    "roti","rice","eggrice","paneer","dal","egg-curry","chicken","chicken rice","matar paneer","dal-makhni",
]

//filter out veg and non-veg items.

let non_veg = menu.filter((items)=>{
    return (items.includes("egg") || items.includes("chicken"))
})
let veg = menu.filter((items)=>{
    return !(items.includes("egg") || items.includes("chicken"))
})
console.log(veg)
console.log(non_veg)