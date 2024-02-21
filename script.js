//API obter ip do usuario
let input= document.getElementById('ip_address')
function getIP(){
    let xml= new XMLHttpRequest()
    xml.open('GET','https://api.ipify.org/?format=json')
    xml.onreadystatechange=function(){
        if(xml.readyState==4){
            if(xml.status==200){
                let responseObjJSON= JSON.parse(xml.responseText)
                input.value=responseObjJSON['ip']

            }
            else{
                alert('Algo deu errado. Codigo do erro: '+xml.status)
            }
        }
    }
    xml.send()
}
getIP()