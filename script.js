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
                IPInfo(responseObjJSON['ip'])
            }
            else{
                alert('Algo deu errado. Codigo do erro: '+xml.status)
            }
        }
    }
    xml.send()
}
getIP()


//API para obter dados do IP
function IPInfo(ip){
    let xml= new XMLHttpRequest()
    xml.open('GET',`http://ip-api.com/json/${ip}`)
    xml.onreadystatechange=function(){
        if(xml.readyState==4){
            if(xml.status==200){
                let responseObjJSON= JSON.parse(xml.responseText)
                document.getElementById('IP-Address').innerHTML=responseObjJSON['query']
                document.getElementById('Location').innerHTML=responseObjJSON['country']+', '+responseObjJSON['city']
                document.getElementById('Timezone').innerHTML=responseObjJSON['timezone']
                document.getElementById('ISP').innerHTML=responseObjJSON['isp']
            }
            else{
                alert('Algo deu errado. Codigo do erro: '+xml.status)
            }
        }
    }
    xml.send()
}

//adicionando eventListener no botao 
let button=document.getElementById('search')
button.addEventListener('click', function(){
    if(input.value != ''){
        IPInfo(input.value)
    }
    else{
        alert('insira um IP válido')
    }
})