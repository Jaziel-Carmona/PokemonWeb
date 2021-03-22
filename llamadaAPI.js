
var nextPage = "";
var lastPage = "";
var ApiURL = "";

function next() 
{
    ApiURL = nextPage;
    FindPokemones();
}

function back() 
{
    ApiURL = lastPage;
    FindPokemones();
}

function search() 
{
    ApiURL = "https://pokeapi.co/api/v2/pokemon";
    FindPokemones();
}

function FindPokemones()
{
    document.getElementById("resultados").innerHTML = "";
    debugger;
    var data = undefined;
    var request = new XMLHttpRequest();
    request.open('GET',ApiURL, true);
    request.send();

    request.onreadystatechange = function()
    {
    
        if(this.readyState == 4 && this.status == 200)
        {
            debugger;
            var resultRawData = this.response;
            data = JSON.parse(resultRawData);
            showApiData(data);
            
        }

    }
}

function showApiData (data)
{
    var element = document.getElementById("resultados");
    var countingHtml = document.createElement('h5');
    countingHtml.style.color = "black";
    countingHtml.style.margin = "30px";
    countingHtml.innerHTML = "Cantidad de pokemones encontrados: "+ data.count;
    element.appendChild(countingHtml);

    for(var i = 0; i < data.results.length; i++)
    {
        var currentItem = data.results[i];
        var pokemon = document.createElement('h5');
        pokemon.style.color = "blue";
        var htmlStyle = "<hr/ ><strong>" + currentItem.name + "</strong><br />";
        pokemon.innerHTML = htmlStyle;

        document.getElementById('resultados').appendChild(pokemon);

    }

    if(data.next != null)
    {
        document.getElementById("buttonNext").style.display = "inline";
        nextPage = data.next;
    }
    else
    {
        document.getElementById("buttonNext").style.display = "none";
    }

    if(data.previous != null)
    {
        document.getElementById("buttonBack").style.display = "inline";
        lastPage = data.previous;
    }
    else
    {
        document.getElementById("buttonBack").style.display = "none";
    }
        

}