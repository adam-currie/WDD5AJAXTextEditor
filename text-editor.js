var xmlhttp;

if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
}else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function addEventCrossPlatform(element, eventText, listener){
    if(element.addEventListener){
        element.addEventListener("click", listener);
    }else if(element.attachEvent){
        element.attachEvent("on"+eventText, listener);
    }
}

function filesDropDown(){
    xmlhttp.onreadystatechange = filesDropDownCallback;
    xmlhttp.open("GET", "text-file-management.php?request=getFileList", true);
    xmlhttp.send(null);
}

function tryHideFilesDropdown(e){
    if (!e) e = window.event;
    var target = (e.target || e.srcElement);

    if(target.id === "files-dropdown"){  
        hideFilesDropdown();
    }
}

function hideFilesDropdown(){
    var dropdown = document.getElementById("files-dropdown");
    dropdown.style.display = "none";
}

function filesDropDownCallback(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        var files = xmlhttp.responseText.split("\n");
        var dropdown = document.getElementById("files-dropdown");
        dropdown.innerHTML = "";
        var width = 0;
        dropdown.style.display = "block";
           
        for(var i = 0; i < files.length; i++){
            var btn = document.createElement("button");
            var text = document.createTextNode(files[i]);
            btn.appendChild(text);
            addEventCrossPlatform(btn, "click", loadFile);
            
            dropdown.appendChild(btn);
            dropdown.appendChild(document.createElement("br"));
            btn.style.height = "1.7em";
            
            if(btn.offsetWidth > width){
                for(var j = 0; j < dropdown.childElementCount; j++){
                    dropdown.children[j].style.width = btn.offsetWidth + "px";
                }
            }
        }
        
        dropdown.style.height = (btn.offsetHeight*i)+"px";
    }
}

function loadFile(e){
    if (!e) e = window.event;
    var target = (e.target || e.srcElement);
    
    xmlhttp.onreadystatechange = loadFileCallback;
    xmlhttp.open("GET", "text-file-management.php?request=loadFile&file="+target.firstChild.nodeValue, true);
    xmlhttp.send(null);
    
    hideFilesDropdown();
}

function loadFileCallback(){
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        document.getElementById("editor-text").value = xmlhttp.responseText;
    }
}