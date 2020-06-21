export const getCategoryOptions = (list) => {
    return list.map((item)=> {
        return {
            label: item,
            value: item
        }
    })
}
