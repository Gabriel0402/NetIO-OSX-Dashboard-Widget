/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */

var json = null;

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    dashcode.setupParts();
        

    var preferenceForKey = "url";
    
    preferenceForKey = widget.preferenceForKey(widget.identifier + "-" + preferenceForKey);
    
    if (typeof(preferenceForKey) == 'undefined') { 
        preferenceForKey = "default.json"; 
    }

    
    textField.value = preferenceForKey;
    reload();
    
}


//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    
    reload();
    
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}

function reload()
{
    $("#render_area").html('<img class="background_image" src="Images/background_iPhone.png">');
    
    url = textField.value;
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4) {

            json = parseJSON(xmlhttp.responseText); 
            if(json) { 
                render(json); 
            }
        }
    }
    
    xmlhttp.send("");
}

function responseHandler()
{
}

function send(ecmd_command)
{
    var ip = json.connections[0].host;                          // reading the IP from the IP textfield on the back
    var port = json.connections[0].port;                      // reading the Port from the Port textfield on the back

    widget.system("/bin/echo '!"+ecmd_command+"' | /usr/bin/nc "+ip+" "+port, responseHandler);
}


function changeUrl(event)
{
    var preferenceKey = "url";
    var preferenceValue = textField.value;

    // Preference code
    widget.setPreferenceForKey(preferenceValue, widget.identifier + "-" + preferenceKey);
}

function parseJSON(json){
    try{
        if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json)) {
            var j = eval('(' + json + ')');
            return j;
        }
    } catch(e) {
        return false;
    }
}

