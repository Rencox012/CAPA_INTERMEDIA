export function setCookie(c_name,value,exdays)
{
    //create a new date object
    var exdate=new Date();
    //set the expiration date of the cookie
    exdate.setDate(exdate.getDate() + exdays);
    //create the cookie with the name, value and expiration date
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    //set the cookie
    document.cookie=c_name + "=" + c_value;
    console.log("Cookie set");
}
