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
getIP() //executa assim que a página carregar

let map=document.getElementById( 'map' ) //elemento onde será exibido o mapa ou mensagem de erro

//API para obter dados do IP
function IPInfo(ip){
    let xml= new XMLHttpRequest()
    xml.open('GET',`http://ip-api.com/json/${ip}`)
    xml.onreadystatechange=function(){
        if(xml.readyState==4){
            if(xml.status==200){
                let responseObjJSON= JSON.parse(xml.responseText)
                let LocationObj=document.getElementById('Location')
                let TimezoneObj=document.getElementById('Timezone')
                let IspObj=document.getElementById('ISP')

                document.getElementById('IP-Address').innerHTML=responseObjJSON['query']
                
                map.innerHTML='' //limpa o mapa a cada iteração
                //verifica se a latitude e longitude não são indefinidos
                if(responseObjJSON['lat']!=undefined && responseObjJSON['lon']!=undefined){
                    createmap(responseObjJSON['lon'],responseObjJSON['lat'])
                    LocationObj.innerHTML=responseObjJSON['country']+', '+responseObjJSON['city']
                }
                else{
                    map.classList.add('error')
                    map.innerHTML='Location not available'
                    LocationObj.innerHTML='Not found'
                }

                //verifica se o timezone não é indefinido
                if(responseObjJSON['timezone']!=undefined){
                    TimezoneObj.innerHTML=responseObjJSON['timezone']
                }
                else{
                    TimezoneObj.innerHTML='Not found'
                }

                //verifica se o ISP não é indefinido
                if(responseObjJSON['isp']!=undefined){
                    IspObj.innerHTML=responseObjJSON['isp']
                }
                else{
                    IspObj.innerHTML='Not found'
                }    
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
button.addEventListener('click', search)
window.addEventListener('keydown', function(event){
    if(event.key=='Enter' && input.value!=''){
        search()
    }
})

//função que incia a busca do IP
function search(){
    if(input.value != ''){
        IPInfo(input.value)
    }
    else{
        alert('insira um IP válido')
    }
}


//cria o mapa e adiciona um marcador
function createmap(lon, lat){
    
    //cria o mapa:
    let map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([lon, lat]),
          zoom: 4,
        }),
    });

    //adicionar marcador:
    let marker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
      });
    
      let markerStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: 'marcador.png', // URL da imagem do marcador
        }),
      });
    
      marker.setStyle(markerStyle);
    
      let vectorSource = new ol.source.Vector({
        features: [marker],
      });
    
      let vectorLayer = new ol.layer.Vector({
        source: vectorSource,
      });
    
      map.addLayer(vectorLayer)
}

