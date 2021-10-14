import { useEffect, useRef, useState} from "react"

export const useFetch = (url) => {
    
    const [state, setState] = useState({data:null, loader:true, error:null})

    const isMounted = useRef(true)
    useEffect(() => {
        return () => {
            //Cuando se va el componente se ejecuta el return
            isMounted.current = false
        }
    }, [])

    useEffect(()=>{

        setState({data:null, loader:true, error:null})

        fetch(url)
            .then(  resp => resp.json())
            .then( data =>{
                    if(isMounted){
                        setState({
                            data:data,
                            loader:false,
                            error:null
                        })
                    }
            } ).catch( ()=>{
                setState({
                    data:null,
                    loader:false,
                    error:'no se pudo cargar'
                })
            } )

    },[url])

    return state

}
