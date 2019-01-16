import { fromJS } from 'immutable'
import SparkMD5 from 'spark-md5'

const colorPicker = (md5String) => {

    const firtCharOfMd5 = SparkMD5.hash(md5String).substring(0,1)

    if(48 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 51){
        return '#B3B3B3'
    }
    if(52 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 55){
        return '#7A00CC'
    }
    if(56 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 57){
        return '#CC00CC'
    }
    if(97 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 100){
        return '#EE0000'
    }
    if(101 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 104){
        return '#EE8F00'
    }
    if(105 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 108){
        return '#EEEE00'
    }
    if(109 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 112){
        return '#A3CC00'
    }
    if(113 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 116){
        return '#07C607'
    }
    if(117 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 120){
        return '#00CCCC'
    }
    if(121 <= firtCharOfMd5.charCodeAt(0) && firtCharOfMd5.charCodeAt(0) <= 122){
        return '#007ACC'
    }
}

const extractFeatureString = (visitor_name) => {
    return visitor_name.substring(0,2)
}

const defaultState = fromJS({
    salt: 'avatar',
    colorPicker: colorPicker,
    extractFeatureString: extractFeatureString
})

export default (state = defaultState, action) => {
    return state
}



