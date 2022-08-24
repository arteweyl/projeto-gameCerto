var listaTipoJogos = [,"mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"];
const div1 = document.getElementById("container-1");

callCheckBox(15,listaTipoJogos)

function callCheckBox (k,array){
    const  ncheckbox= (array.length-1)/k;

     // k vai assumir valor de multiplo de itens -1 que o array possui, para essa lista específica só temos a opção de 3 ou 5 ou 15

    for(var j=1;j<=k;j++){
        const div1 = document.getElementById("container-1");
        //cria multiplos divs pra aninharem ul
        var div = document.createElement("div");
        div.setAttribute("id","div-checkbox"+j);
        div.setAttribute("class","div-checkbox");
        div1.appendChild(div);
        
        //cria multiplos ul's pra aninhar li's
        var ul = document.createElement("ul");
        ul.setAttribute("class","ul-checkbox");
        ul.setAttribute("id","ul-div-"+j);
        div.appendChild(ul);
    
        for(var i=ncheckbox*(j-1)+1;i<=ncheckbox*j;i++){
                //cria multiplos li's e aninha dentro dos ul's criados anteriormente.
                var li = document.createElement("li");
                li.setAttribute("class","li-checkbox");
                li.setAttribute("id","li-checkbox"+i)
                ul.appendChild(li);
                //cria multiplos labels correspondentes aos checkbox 
                var labelbox = document.createElement("label");
                labelbox.setAttribute("class","label-Checkbox");
                labelbox.setAttribute("id","labelbox"+i);
                labelbox.htmlFor = box;
                labelbox.textContent = array[i];
                //cria multiplos checkbox correspondentes aos checkbox 
                var box = document.createElement("input")
                box.setAttribute("class","Checkbox");
                box.setAttribute("id","checkbox"+i);
                box.type = "checkbox";
                box.value = array[i]
                //aninha checkbox e labels nas listas criadas acima
                li.appendChild(box);
                li.appendChild(labelbox);  
            
            
                
                
        }
    }
}