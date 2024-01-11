export const formDate = (dataString:string): string => {
    const data = new Date(dataString)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',


    }
return data.toLocaleDateString('us-US', options)
}
